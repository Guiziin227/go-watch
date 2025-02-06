package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	DSN string
	Domain string
	DB *sql.DB
}

func main() {
	//set app config
	var app application

	//read the command line arguments

	flag.StringVar(&app.DSN,"dsn", "host=localhost port=5432 user=postgres password=postgres dbname=movies sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")
	flag.Parse()

	//connect to the database

	conn, err := app.connetToDB()
	if err != nil {
		log.Fatal(err)
	}

	app.DB = conn
	defer app.DB.Close()

	app.Domain = "example.com"

	
	//start the server

	log.Printf("Starting server on port %d", port)

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		fmt.Println("Error starting the server: ", err)
		log.Fatal(err)
	}
}