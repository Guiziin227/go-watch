import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    let movieList = [
      {
        id: 1,
        title: 'The Shawshank Redemption',
        release_date: '1994-09-14',
        runtime: 142,
        genre: 'Drama',
        mpaa_rating: 'R',
        description: 'Two imprisoned',
      },
      {
        id: 2,
        title: 'The Godfather',
        release_date: '1972-03-24',
        runtime: 175,
        genre: 'Crime, Drama',
        mpaa_rating: 'R',
        description:
          'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      },
      {
        id: 3,
        title: 'The Dark Knight',
        release_date: '2008-07-18',
        runtime: 152,
        genre: 'Action, Crime, Drama',
        mpaa_rating: 'PG-13',
        description:
          'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
      },
    ]
    setMovies(movieList)
  }, [])

  return (
    <>
      <div className="text-center">
        <h2>Movies!</h2>
        <hr />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Release Date</th>
              <th>Runtime</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td>
                  <Link to={`/movies/${m.id}`}>{m.title}</Link>
                </td>
                <td>{m.release_date}</td>
                <td>{m.runtime}</td>
                <td>{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
