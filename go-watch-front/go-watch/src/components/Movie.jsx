import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

export default function Movie() {
    const [movie, setMovie] = useState({})
    const [error, setError] = useState(null)

    let {id} = useParams()

    useEffect(() => {
        async function fetchMovie() {
            try {
                setMovie({}) // Clear previous state
                setError(null) // Cl
                const headers = new Headers()
                headers.append("Content-type", "application/json")

                const requestOptions = {
                    method: "GET",
                    headers: headers,
                }

                const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/movies/${id}`, requestOptions)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json()
                console.log(result)
                setMovie(result)
            } catch (err) {
                console.error("Error fetching movie:", err)
                setError(err.message)
            }
        }

        fetchMovie()
    }, [id])

    if (movie.genres) {
        movie.genres = Object.values(movie.genres)
    } else {
        movie.genres = []
    }

    if (error) {
        return <div className="text-center">Error: {error}</div>
    }


    return (
        <div className="text-center">
            <h2>Movie: {movie.title}</h2>
            <small>
                <em>
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                    , {movie.runtime} minutes, Rating: {movie.mpaa_rating}
                </em>
            </small>
            <br/>
            {movie.genres.map(g => (
                <span key={g.id} className="badge bg-secondary me-2">{g.genre}</span>
            ))}
            <hr/>

            {movie.image !== "" && (
                <div className="mb-3">
                    <img src={`https://image.tmdb.org/t/p/w200/${movie.image}`} alt={movie.title}/>
                </div>

            )}

            <p>{movie.description}</p>
        </div>
    )
}