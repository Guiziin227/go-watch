import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "./form/Input.jsx";

export default function EditMovie() {
    const { jwtToken } = useOutletContext();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);

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
    });

    let { id } = useParams();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return;
        }
    }, [jwtToken, navigate]);

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

    return (
        <>
            <div>
                <h2>{id == 0 ? "Add/Edit Movie!" : "Add/Edit Movies!"}</h2>
                <hr />
                <pre>{JSON.stringify(movie, null, 3)}</pre>

                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={movie.id} id="id" />

                    <Input
                        name="title"
                        title="Title"
                        type="text"
                        onChange={handleChange}
                        value={movie.title}
                        className="form-control"
                        errorDiv={hasError("title") ? "text-danger" : "d-none"}
                        errorMsg="Please enter a title"
                    />
                </form>
            </div>
        </>
    );
}