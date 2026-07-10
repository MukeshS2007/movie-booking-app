import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieCard from "../../components/MovieCard/MovieCard";
import movies from "../../data/movies";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <SearchBar />

      <section style={{ padding: "40px" }}>
        <h2>Now Showing</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;