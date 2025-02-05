package main

import "net/http"

func (app *application) enableCORS(h http.Handler) http.Handler { //Função enableCORS que recebe um Handler e retorna um Handler
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { //Função anônima que recebe um ResponseWriter e um Request
		w.Header().Set("Access-Control-Allow-Origin", "http://*") //Portanto qualquer origem pode acessar a API
		if r.Method == "OPTIONS" { //Se o método da requisição for OPTIONS
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT,PATCH, DELETE") //Define os métodos permitidos
			w.Header().Set("Access-Control-Allow-Credentials", "true") //Permite credenciais
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-CSRF-Token") //Define os cabeçalhos permitidos
			return
		} else { //Se o método da requisição não for OPTIONS
			h.ServeHTTP(w, r) //Chama o método ServeHTTP do Handler passando o ResponseWriter e o Request
		}
	})
}