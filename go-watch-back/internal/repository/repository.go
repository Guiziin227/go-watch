package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	AllMovies(genres ...int) ([]*models.Movie, error)
	OneMovie(id int64) (*models.Movie, error)
	OneMovieForEdit(id int64) (*models.Movie, []*models.Genre, error)

	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
	AllGenres() ([]*models.Genre, error)

	InsertMovie(movie models.Movie) (int, error)
	UpdateMovieGenres(id int, genreIDs []int) error
	UpdateMovie(movie models.Movie) error
	DeleteMovie(id int) error
}
