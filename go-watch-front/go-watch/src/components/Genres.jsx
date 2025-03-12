import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Genres() {

    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: headers,
        }

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}/genres`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setGenres(data);
                }
            })
            .catch(error => setError(error));
    }, []);

    if (error != null) {
        return (
            <>
                <div className="text-center">
                    <h2>Genres!</h2>
                    <hr/>
                    <p>Something went wrong!</p>
                </div>
            </>)
    } else {
        return (
            <>
                <div>
                    <h2>Genres!</h2>
                    <hr/>

                    <div className="list-group">
                        {genres.map((g) => (
                                <Link to={`/genres/${g.id}`} key={g.id} state={
                                    {genreName: g.genre}
                                }
                                      className="list-group-item list-group-item-action">{g.genre}</Link>
                            )
                        )
                        }
                    </div>
                </div>
            </>
        )

    }

}
