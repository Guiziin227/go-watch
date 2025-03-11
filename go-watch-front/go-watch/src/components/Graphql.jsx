import {useEffect, useState} from "react";
import Input from "./form/Input.jsx";
import {Link} from "react-router-dom";

export default function Graphql() {
    //set up stateful variables

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [fullList, setFullList] = useState([]);

    //perform the search
    const performSearch = async () => {

    }

    //useEffect to run the sear
    useEffect(() => {
        const payload = `
            {
                list{
                    id
                    title
                    runtime
                    release_date
                    mpaa_rating
                }
            }
        `

        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: payload
        }

        fetch(`http://localhost:8080/graph`, requestOptions)
            .then(response => response.json())
            .then(response => {
                let theList = Object.values(response.data.list)
                setMovies(theList)
                setFullList(theList)
            })
            .catch(error => console.log('error: ', error))
    }, []);

    const handleChange = (event) => {
        event.preventDefault()


    }

    return (
        <div className="text-center">
            <h2>Graph!</h2>
            <hr/>

            <form onSubmit={handleChange}>
                <Input
                    name={"search"}
                    title={"Seach"}
                    type={"search"}
                    value={searchTerm}
                    className={"form-control"}
                    onChange={handleChange}
                />
            </form>

            {movies ? (

                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>MPAA-Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/movies/${movie.id}`}>
                                    {movie.title}
                                </Link>
                            </td>
                            <td> {new Date(movie.release_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</td>
                            <td>{movie.mpaa_rating}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            ) : (
                <p>No movies (yet)!</p>
            )}
        </div>
    )
}

// {new Date(movie.release_date).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                     }
