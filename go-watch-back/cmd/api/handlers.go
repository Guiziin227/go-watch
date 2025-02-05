package main

import (
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
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
		var movies []models.Movie// Slice de structs do tipo Movie para armazenar os filmes (inicialmente vazio)

		rd, _ := time.Parse("2006-01-02", "1986-03-07") // Parse da data de lançamento do filme Highlander

		highlander := models.Movie{ // Cria uma nova instância de Movie com os dados do filme Highlander
			ID:          1,
			Title:       "Highlander",
			ReleaseDate: rd,
			Runtime:     116,
			MPAARating: "R",
			Description: "An immortal Scottish swordsman must confront the last of his immortal opponent, a murderously brutal barbarian who lusts for the fabled 'Prize'.",
			Image:       "https://image.tmdb.org/t/p/w500/1Z8y7Wd6l5p2h5jX3nZ0l5J8t4x.jpg",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		}

		movies = append(movies, highlander) // Adiciona o filme Highlander ao slice de filmes
 
		rd, _ = time.Parse("2006-01-02", "2010-07-16")

		inception := models.Movie{
			ID:          2,
			Title:       "Inception",
			ReleaseDate: rd,
			Runtime:     148,
			MPAARating: "PG-13",
			Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
			Image:       "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		}

		movies = append(movies, inception) // Adiciona o filme Inception ao slice de filmes

		out, err := json.Marshal(movies) // Converte o slice de filmes para JSON
		if err != nil {
			fmt.Println("Error marshalling the response: ", err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(out) // Escreve a resposta no corpo da resposta HTTP
}