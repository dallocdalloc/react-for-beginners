import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    };
    useEffect(() => {
        getMovie();
    }, []);
    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <img src={movie.medium_cover_image} />
                    <h2>TITLE: {movie.title_long}</h2>
                    <h2>RATING: {movie.rating}</h2>
                    <h2>RUNTIME: {movie.runtime}</h2>
                    <h2>GENRES</h2>
                    <ul>
                        {movie.genres.map((g, index) => {
                            // console.log(index, g);
                            <li key={`${id}_${index}`}>{g}</li>
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Detail;