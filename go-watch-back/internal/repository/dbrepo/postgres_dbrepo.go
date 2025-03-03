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

func (m *PostgresDBRepo) Connection() *sql.DB { // Método que retorna a conexão com o banco de dados
	return m.DB
}

func (m *PostgresDBRepo) AllMovies() ([]*models.Movie, error) { // Método que retorna todos os filmes

	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout) // Cria um contexto com um tempo limite
	defer cancel()                                                      // Adiciona uma função defer para cancelar o contexto

	query := ` 
		SELECT 
			id, title, release_date, runtime,
			mpaa_rating, description, coalesce(image, ''),
			created_at, updated_at
		FROM 
			movies
		ORDER BY 
			title
	` // Query para selecionar todos os filmes

	rows, err := m.DB.QueryContext(ctx, query) // Executa a query no banco de dados
	if err != nil {
		return nil, err
	}

	var movies []*models.Movie // Slice de ponteiros para structs do tipo Movie para armazenar os filmes

	for rows.Next() { // Itera sobre as linhas retornadas pela query
		var movie models.Movie // Instância de Movie para armazenar os dados de um filme
		err = rows.Scan(       // Lê os valores das colunas da linha atual e armazena nas propriedades da struct Movie
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

func (m *PostgresDBRepo) OneMovie(id int64) (*models.Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, title, release_date, runtime, 
	mpaa_rating, description, coalesce(image, ''), created_at, updated_at
	from movies where id = $1`

	row := m.DB.QueryRowContext(ctx, query, id)

	var movie models.Movie

	err := row.Scan(
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

	//get genres, if any
	query = `select g.id, g.genre from movies_genres mg 
    left join genres g on (mg.genre_id = g.id)
	where mg.movie_id = $1 
	order by g.genre`

	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, err
	}

	defer rows.Close()

	var genres []*models.Genre

	for rows.Next() {
		var g models.Genre
		err = rows.Scan(
			&g.ID,
			&g.Genre,
		)
		if err != nil {
			return nil, err
		}

		genres = append(genres, &g)
	}

	movie.Genres = genres

	return &movie, err

}

func (m *PostgresDBRepo) OneMovieForEdit(id int64) (*models.Movie, []*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, title, release_date, runtime, 
	mpaa_rating, description, coalesce(image, ''), created_at, updated_at
	from movies where id = $1`

	row := m.DB.QueryRowContext(ctx, query, id)

	var movie models.Movie

	err := row.Scan(
		&movie.ID,
		&movie.Title,
		&movie.ReleaseDate,
		&movie.Runtime,
		&movie.MPAARating,
		&movie.Description,
		&movie.CreatedAt,
		&movie.UpdatedAt,
	)

	if err != nil {
		return nil, nil, err
	}

	//get genres, if any
	query = `select g.id, g.genre from movies_genres mg 
    left join genres g on (mg.genre_id = g.id)
	where mg.movie_id = $1 
	order by.genre`

	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil, err
	}

	defer rows.Close()

	var genres []*models.Genre
	var genresArray []int

	for rows.Next() {
		var g models.Genre
		err = rows.Scan(
			&g.ID,
			&g.Genre,
		)
		if err != nil {
			return nil, nil, err
		}

		genres = append(genres, &g)
		genresArray = append(genresArray, g.ID)
	}

	movie.Genres = genres
	movie.GenresArray = genresArray

	var allGenres []*models.Genre

	query = `select id, genre, from genres order by genre`
	gRows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil, err
	}

	defer gRows.Close()

	for gRows.Next() {
		var g models.Genre
		err = gRows.Scan(
			&g.ID,
			&g.Genre)

		if err != nil {
			return nil, nil, err
		}
		allGenres = append(allGenres, &g)
	}

	return &movie, allGenres, err

}

func (m *PostgresDBRepo) GetUserByEmail(email string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, email, first_name, last_name, password,
			created_at, updated_at from users where email = $1`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, email)

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.FirstName,
		&user.LastName,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m *PostgresDBRepo) GetUserByID(id int) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, email, first_name, last_name, password,
			created_at, updated_at from users where id = $1`

	var user models.User
	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.FirstName,
		&user.LastName,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m *PostgresDBRepo) AllGenres() ([]*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, genre, created_at, updated_at from genres order by genre`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var genres []*models.Genre

	for rows.Next() {
		var g models.Genre
		err = rows.Scan(
			&g.ID,
			&g.Genre,
			&g.CreatedAt,
			&g.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		genres = append(genres, &g)
	}

	return genres, nil

}

func (m *PostgresDBRepo) InsertMovie(movie models.Movie) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	stmt := `insert into movies (title, release_date, runtime, mpaa_rating,
                description, created_at, updated_at ,image)
				values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`

	var newID int
	err := m.DB.QueryRowContext(ctx, stmt,
		movie.Title,
		movie.ReleaseDate,
		movie.Runtime,
		movie.MPAARating,
		movie.Description,
		movie.Image,
		time.Now(),
		time.Now(),
	).Scan(&newID)

	if err != nil {
		return 0, err
	}

	return newID, nil
}
