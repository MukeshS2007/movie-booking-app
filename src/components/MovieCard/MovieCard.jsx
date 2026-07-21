import { useState } from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

const fallbackPoster = (title) =>
  `https://placehold.co/300x450/111111/ffffff?text=${encodeURIComponent(
    title || "No Image"
  )}`;

function MovieCard({ movie }) {
  const [posterSrc, setPosterSrc] = useState(
    movie.poster?.trim() || fallbackPoster(movie.title)
  );

  return (
    <div className="movie-card">
      <div className="poster-container">
        <img
          src={posterSrc}
          alt={movie.title || "Movie poster"}
          onError={() => {
            setPosterSrc(fallbackPoster(movie.title));
          }}
        />

        <div className="rating-badge">
          ⭐ {movie.rating || "N/A"}
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title || "Untitled Movie"}</h3>

        <div className="movie-meta">
          <span>{movie.genre || "Unknown Genre"}</span>
          <span>•</span>
          <span>{movie.language || "Unknown Language"}</span>
        </div>

        <p className="duration">
          ⏱ {movie.duration || "N/A"}
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