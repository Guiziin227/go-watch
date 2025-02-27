import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "./form/Input.jsx";
import {Select} from "./form/Select.jsx";
import {TextArea} from "./form/TextArea.jsx";
import {Checkbox} from "./form/Checkbox.jsx";

export default function EditMovie() {
    const { jwtToken } = useOutletContext();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);

    const mpaaOptions = [
        {id: "G", value: "G"},
        {id: "PG", value: "PG"},
        {id: "PG13", value: "PG13"},
        {id: "R", value: "R"},
        {id: "NC17", value: "NC17"},
        {id: "18A", value: "18A"},
    ]

    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    };

    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        description: "",
        genres: [],
        genres_array: [Array(13).fill(false)]
    });

    let { id } = useParams();

    if(id === undefined){
        id = 0;
    }

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return;
        }

        if (id === 0){
            // add movie
            setMovie({
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                description: "",
                genres: [],
                genres_array: [Array(13).fill(false)]
            })

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: headers,
            }

            fetch("http://localhost:8080/genres", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                })
                .then((data) => {
                    const checks = [];

                    data.forEach((genre) => {
                        checks.push({id: genre.id, genre: genre.genre, checked: false});
                    });

                    setMovie((m) => ({
                        ...m,
                        genres: checks,
                        genres_array: [],
                    }));
                })
                .catch((error) => {
                    setError(error);
                });
        } else {
            // edit movie
        }


    }, [id,jwtToken, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value,
        }));
    };

    const handleCheck = (e, position) => {
        console.log("handleCheck", e.target.checked, position);


    }

    return (
        <>
            <div>
                <h2>{id == 0 ? "Add/Edit Movie!" : "Add/Edit Movies!"}</h2>
                <hr />
                <pre>{JSON.stringify(movie, null, 3)}</pre>

                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={movie.id} id="id" />

                    <Input
                        name={"title"}
                        title={"Title"}
                        type={"text"}
                        onChange={handleChange}
                        value={movie.title}
                        className={"form-control"}
                        errorDiv={hasError("title") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a title"}
                    />

                    <Input
                        name={"release_date"}
                        title={"Release Date"}
                        type={"date"}
                        onChange={handleChange}
                        value={movie.release_date}
                        className="form-control"
                        errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
                        errorMsg="Please enter a release date"
                    />

                    <Input
                        name={"runtime"}
                        title={"Runtime"}
                        type={"text"}
                        onChange={handleChange}
                        value={movie.runtime}
                        className={"form-control"}
                        errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a runtime"}
                    />

                    <Select onChange={handleChange} name={"mpaa_rating"} options={mpaaOptions} title={"MPAA Rating"}
                            placeHolder={"Choose..."} errorMsg={"Plase choose"}
                            errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"}
                    />

                    <TextArea onChange={handleChange} name={"description"} title={"Description"}
                              value={movie.description} errorMsg={"Please enter a description"}
                              rows={"3"}
                              errorDiv={hasError("description") ? "text-danger" : "d-none"}
                    />

                    <hr/>

                    <h3>Genres</h3>

                    {movie.genres && movie.genres.length > 1 &&
                        <>
                        {Array.from(movie.genres).map((g, index) => (

                            <Checkbox
                                name={"genre"}
                                onChange={(e)=>handleCheck(e, index)}
                                checked={movie.genres[index].checked}
                                title={g.genre}
                                key={index}
                                id={"genre-" + index}
                                value={g.id}
                            />


                        ))}
                        </>
                    }

                </form>
            </div>
        </>
    );
}