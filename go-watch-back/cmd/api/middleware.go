package main

import (
	"net/http"
)

func (app *application) enableCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Definindo os cabeçalhos para permitir CORS
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173") // Frontend
		w.Header().Set("Access-Control-Allow-Credentials", "true")             // Permite enviar cookies / credenciais

		// Especificando os métodos permitidos
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")

		// Definindo os cabeçalhos permitidos para a requisição
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, X-CSRF-Token, Authorization")

		// Se for uma requisição OPTIONS (preflight), apenas retorna o cabeçalho e 200 OK
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Caso contrário, chama o próximo handler
		h.ServeHTTP(w, r)
	})
}
