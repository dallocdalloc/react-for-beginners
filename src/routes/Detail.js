import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

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
    // console.log(movie);
    return (
        <div className={styles.movie}>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className={styles.movie}>
                    <img src={movie.medium_cover_image} className={styles.movie__img} />
                    <div>
                        <h2 className={styles.movie__title}>{movie.title}</h2>
                        <ul>
                            <li className={styles.movie__year}>YEAR {movie.year}</li>
                            <li className={styles.movie__year}>RATING {movie.rating}</li>
                            <li className={styles.movie__year}>RUNTIME {movie.runtime}</li>
                        </ul>
                        {/* <h3 className={styles.movie__year}>YEAR {movie.year}</h3>
                        <h3 className={styles.movie__rating}>RATING {movie.rating}</h3>
                        <h3 className={styles.movie__runtime}>RUNTIME {movie.runtime}</h3> */}
                        
                        <p>{movie.description_full}</p>
                        <ul className={styles.movie__genres}>
                        <span >GENRES</span>{movie.genres.map((g) => (
                                // console.log(g);
                                <li>{g}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;