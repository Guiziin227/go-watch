package dbrepo

import (
	"backend/internal/models"
	"context"
	"database/sql"
	"time"
)

type PostgresDBRepo struct { // Estrutura que implementa a interface DatabaseRepo
	DB *sql.DB
}

const dbTimeout = time.Second * 3 // Tempo limite para a execução de uma query
 
func (m *PostgresDBRepo) AllMovies() ([]*models.Movie, error) { // Método que retorna todos os filmes

	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout) // Cria um contexto com um tempo limite
	defer cancel() // Adiciona uma função defer para cancelar o contexto

	query := ` // Query para selecionar todos os filmes
		SELECT 
			id, title, release_date, runtime,
			mpaa_rating, description, coalesce(image, ''),
			created_at, updated_at
		FROM 
			movies
		ORDER BY 
			title
	`

	rows, err := m.DB.QueryContext(ctx, query) // Executa a query no banco de dados
	if err != nil {
		return nil, err
	}

	var movies []*models.Movie // Slice de ponteiros para structs do tipo Movie para armazenar os filmes

	for rows.Next() {  // Itera sobre as linhas retornadas pela query
		var movie models.Movie // Instância de Movie para armazenar os dados de um filme
		err = rows.Scan( // Lê os valores das colunas da linha atual e armazena nas propriedades da struct Movie
			&movie.ID,
			&movie.Title,
			&movie.ReleaseDate,
			&movie.Runtime,
			&movie.MPAARating,
			&movie.Description,
			&movie.Image,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		movies = append(movies, &movie) // Adiciona o filme ao slice de filmes
	}

	return movies, nil // Retorna o slice de filmes e nenhum erro

}