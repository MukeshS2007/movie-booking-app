import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Avengers: Endgame</h1>

          <p className="hero-rating">
            ⭐ 9.0 | Action | English | 3h 2m
          </p>

          <p className="hero-description">
            After the devastating events of Infinity War,
            the Avengers assemble one final time to undo
            Thanos' actions and restore balance to the universe.
          </p>

          <div className="hero-buttons">
            <button className="book-btn">🎟 Book Now</button>
            <button className="trailer-btn">▶ Watch Trailer</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;