package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	//set app config
	var app application

	//read the command line arguments

	//connect to the database

	app.Domain = "example.com"

	
	//start the server
	http.HandleFunc("/", Hello)

	log.Printf("Starting server on port %d", port)

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		fmt.Println("Error starting the server: ", err)
		log.Fatal(err)
	}
}