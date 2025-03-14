package main

import (
	"backend/internal/repository"
	"backend/internal/repository/dbrepo"
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"
)

const port = 8080

type application struct {
	DSN          string
	Domain       string
	DB           repository.DatabaseRepo
	auth         Auth
	JWTSecret    string
	JWTIssuer    string
	JWTAudience  string
	CookieDomain string
	APIKey       string
}

func main() {
	//set app config
	var app application

	//read the command line arguments

	flag.StringVar(&app.DSN, "dsn", "host=localhost port=5432 user=postgres password=postgres dbname=movies sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")
	flag.StringVar(&app.JWTSecret, "jwt-secret", "verysecret", "JWT secret")
	flag.StringVar(&app.JWTIssuer, "jwt-issuer", "example.com", "JWT issuer")
	flag.StringVar(&app.JWTAudience, "jwt-audience", "example.com", "JWT audience")
	flag.StringVar(&app.CookieDomain, "cookie-domain", "localhost", "Cookie domain")
	flag.StringVar(&app.Domain, "domain", "example.com", "Domain")
	flag.StringVar(&app.APIKey, "api-key", "2339ca178a8e496e7950076b9d880ca5", "api key")
	flag.Parse()

	//connect to the database

	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}

	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.DB.Connection().Close()

	app.auth = Auth{
		Issuer:        app.JWTIssuer,
		Audience:      app.JWTAudience,
		Secret:        app.JWTSecret,
		TokenExpiry:   time.Minute * 15,
		RefreshExpiry: time.Hour * 24,
		CookiePath:    "/",
		CookieName:    "host-refresh-token",
		CookieDomain:  app.CookieDomain,
	}
	//start the server

	log.Printf("Starting server on port %d", port)

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		fmt.Println("Error starting the server: ", err)
		log.Fatal(err)
	}
}
