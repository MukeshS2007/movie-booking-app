import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies/${id}`
        );

        setMovie(response.data);
      } catch (error) {
        console.error(
          "Error fetching movie:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="details-status">
        <div className="loader"></div>
        <p>Loading movie...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="details-status">
        <h2>🎬 Movie not found</h2>

        <Link to="/">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="movie-details-page">

      {/* Blurred Background */}
      <div
        className="details-background"
        style={{
          backgroundImage: `url(${movie.poster})`,
        }}
      ></div>

      <div className="details-overlay">

        <Link
          to="/"
          className="back-button"
        >
          ← Back to Movies
        </Link>

        <div className="details-container">

          {/* Movie Poster */}
          <div className="poster-section">
            <img
              src={movie.poster}
              alt={movie.title}
              className="details-poster"
            />

            <div className="poster-rating">
              ⭐ {movie.rating}
            </div>
          </div>

          {/* Movie Information */}
          <div className="movie-information">

            <p className="featured-tag">
              🎬 NOW SHOWING
            </p>

            <h1>{movie.title}</h1>

            <div className="movie-details-meta">
              <span>⭐ {movie.rating}</span>
              <span>•</span>
              <span>{movie.genre}</span>
              <span>•</span>
              <span>{movie.language}</span>
              <span>•</span>
              <span>{movie.duration}</span>
            </div>

            <p className="movie-description">
              {movie.description}
            </p>

            <div className="info-cards">

              <div>
                <span>GENRE</span>
                <strong>{movie.genre}</strong>
              </div>

              <div>
                <span>LANGUAGE</span>
                <strong>{movie.language}</strong>
              </div>

              <div>
                <span>DURATION</span>
                <strong>{movie.duration}</strong>
              </div>

            </div>

            <div className="details-actions">

              <Link
                to={`/book/${movie._id}`}
                className="book-tickets-button"
              >
                🎟️ Book Tickets
                <span>→</span>
              </Link>

              <button
                className="watch-trailer-button"
                onClick={() =>
                  alert(
                    "Trailer feature coming soon! 🎬"
                  )
                }
              >
                ▶ Watch Trailer
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MovieDetails;