package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct{
		Status string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status: "active",
		Message: "Welcome to the Go Watch API",
		Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println("Error marshalling the response: ", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)

}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
		movies, err := app.DB.AllMovies() // Chama o método AllMovies do repositório para obter todos os filmes
		if err != nil {
			fmt.Println("Error getting all movies: ", err)
		}

		out, err := json.Marshal(movies) // Converte o slice de filmes para JSON
		if err != nil {
			fmt.Println("Error marshalling the response: ", err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(out) // Escreve a resposta no corpo da resposta HTTP
}