package main

import (
	"net/http"

	"github.com/go-chi/chi"               // Importa o pacote chi para criação de rotas
	"github.com/go-chi/chi/v5/middleware" // Importa os middlewares do chi, como o Recoverer
)

// routes define e retorna o manipulador de rotas para a aplicação.
func (app *application) routes() http.Handler {
	// Cria um novo roteador (mux) usando o chi.
	mux := chi.NewRouter()

	// Adiciona um middleware que recupera de panics, evitando que erros interrompam o servidor.
	mux.Use(middleware.Recoverer)

	// Retorna o roteador configurado, que irá gerenciar as rotas da aplicação.
	return mux
}
