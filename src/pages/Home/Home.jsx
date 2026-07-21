import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/movies"
        );

        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Safe search filter
  const filteredMovies = movies.filter((movie) =>
    (movie.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <Navbar />

      <Hero />

      <section className="movies-section">

        {/* Attractive Now Showing Title Card */}
        <div className="now-showing-title-card">
          <div>
            <span className="section-label">
              🎬 MOVIEBOOKING
            </span>

            <h2>Now Showing</h2>

            <p>
              Discover the latest blockbusters and book your
              perfect movie experience.
            </p>
          </div>

          <div className="film-icon">
            🎞️
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* Movies */}
        {loading ? (
          <div className="loading">
            <h3>Loading movies...</h3>
          </div>
        ) : (
          <div className="movie-grid">

            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
              />
            ))}

            {filteredMovies.length === 0 && (
              <div className="no-movies">
                <h3>🎬 No movies found</h3>

                <p>
                  Try searching for another movie.
                </p>
              </div>
            )}

          </div>
        )}

      </section>
    </div>
  );
}

export default Home;