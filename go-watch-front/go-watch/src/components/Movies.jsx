import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    // Função assíncrona para buscar os filmes
    async function fetchMovies() {
      // Configura os headers da requisição
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      // Configura as opções da requisição
      const requestOptions = {
        method: 'GET',
        headers: headers,
      }

      try {
        // Aguarda a resposta da requisição
        const response = await fetch(
          'http://localhost:8080/movies',
          requestOptions
        )
        // Converte a resposta para JSON
        const data = await response.json()
        // Atualiza o estado com os dados recebidos
        setMovies(data)
      } catch (error) {
        // Em caso de erro, imprime no console
        console.log('error', error)
      }
    }

    // Chama a função para realizar a busca
    fetchMovies()
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
