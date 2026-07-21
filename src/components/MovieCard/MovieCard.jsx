import "./MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="poster-container">
        <img
          src={movie.poster}
          alt={movie.title}
        />

        <div className="rating-badge">
          ⭐ {movie.rating}
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>{movie.genre}</span>
          <span>•</span>
          <span>{movie.language}</span>
        </div>

        <p className="duration">
          ⏱ {movie.duration}
        </p>

        <Link
          to={`/movie/${movie._id}`}
          className="book-button"
        >
          🎟 Book Now
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;