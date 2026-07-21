import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-background"></div>

      <div className="hero-overlay">
        <div className="hero-content">

          <div className="featured-label">
            🔥 FEATURED MOVIE
          </div>

          <h1>
            Avengers:
            <br />
            <span>Endgame</span>
          </h1>

          <div className="hero-meta">
            <span className="rating">
              ⭐ 9.0
            </span>

            <span>•</span>
            <span>Action</span>

            <span>•</span>
            <span>English</span>

            <span>•</span>
            <span>3h 2m</span>
          </div>

          <p className="hero-description">
            After the devastating events of Infinity War,
            the Avengers assemble one final time to undo
            Thanos' actions and restore balance to the universe.
          </p>

          <div className="hero-buttons">
            <button className="book-btn">
              🎟️ Book Now
              <span>→</span>
            </button>

            <button className="trailer-btn">
              <span className="play-icon">▶</span>
              Watch Trailer
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>9.0</strong>
              <small>IMDb Rating</small>
            </div>

            <div>
              <strong>2019</strong>
              <small>Release Year</small>
            </div>

            <div>
              <strong>PG-13</strong>
              <small>Certificate</small>
            </div>
          </div>

        </div>

        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <div>↓</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;