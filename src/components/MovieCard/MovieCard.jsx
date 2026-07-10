import "./MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>⭐ {movie.rating}</p>

        <p>{movie.genre}</p>

        <p>{movie.language}</p>

        <p>{movie.duration}</p>

        <Link to={`/movie/${movie.id}`}>
          <button>Book Now</button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;