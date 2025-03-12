import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


export function OneGenre() {
    //We need to get the props from the parent component

    const location = useLocation();
    const {genreName} = location.state;

    //set the stateful variables
    const [movies, setMovies] = useState([]);

    //get the id from the url
    let {id} = useParams();

    //useEffect to fetch the data from the API
    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
        }

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/movies/genres/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setMovies(data);
                }
            })
            .catch(error => console.log(error));

    }, [id]);

    //return the JSX

    return (
        <>
            <div>
                <h2>{genreName}</h2>
                <hr/>

                {movies ? (<table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Year</th>
                            <th scope="col">Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map((m) => (
                                <tr key={m.id}>
                                    <td>
                                        <Link to={`/movies/${m.id}`}>
                                            {m.title}
                                        </Link>
                                    </td>
                                    <td>{new Date(m.release_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</td>
                                    <td>
                                        {m.mpaa_rating}
                                    </td>
                                </tr>
                            )
                        )
                        }
                        </tbody>
                    </table>) :
                    (<p>No movies found</p>)}
            </div>
        </>
    )

}