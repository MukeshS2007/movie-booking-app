import { useParams } from "react-router-dom";
import movies from "../../data/movies";
import Navbar from "../../components/Navbar/Navbar";
import "./MovieDetails.css";

function MovieDetails() {

  const { id } = useParams();

  const movie = movies.find(
    (m) => m.id === Number(id)
  );

  if (!movie)
    return <h1>Movie Not Found</h1>;

  return (
    <>
      <Navbar />

      <div className="movie-details">

        <img
          src={movie.poster}
          alt={movie.title}
        />

        <div className="details">

          <h1>{movie.title}</h1>

          <p>⭐ {movie.rating}</p>

          <p>Genre : {movie.genre}</p>

          <p>Language : {movie.language}</p>

          <p>Duration : {movie.duration}</p>

          <p>{movie.description}</p>

          <div className="buttons">

            <button
              className="trailer"
              onClick={() =>
                window.open(movie.trailer)
              }
            >
              Watch Trailer
            </button>

            <button className="book">
              Book Tickets
            </button>

          </div>

        </div>

      </div>

    </>
  );
}

export default MovieDetails;