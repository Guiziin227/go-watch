import {useEffect, useState} from "react";
import {Link, useNavigate, useOutletContext} from "react-router-dom";

export default function ManageCatalogue() {
    const [movies, setMovies] = useState([])

    const {jwtToken} = useOutletContext()

    const navigate = useNavigate()

    useEffect(() => {

        if (jwtToken === "") {
            navigate("/login")
            return
        }

        // Função assíncrona para buscar os filmes
        async function fetchMovies() {
            // Configura os headers da requisição
            const headers = new Headers()
            headers.append('Content-Type', 'application/json')
            headers.append('Authorization', 'Bearer ' + jwtToken)

            // Configura as opções da requisição
            const requestOptions = {
                method: 'GET',
                headers: headers,
            }

            try {
                // Aguarda a resposta da requisição
                const response = await fetch(
                    `${import.meta.env.VITE_REACT_APP_BACKEND}/admin/movies`,
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
    }, [jwtToken, navigate])

    return (
        <>
            <div className="text-center">
                <h2>Manage Catalogue!</h2>
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
                                <Link to={`/admin/movie/${m.id}`}>{m.title}</Link>
                            </td>
                            <td>{new Date(m.release_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</td>
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
