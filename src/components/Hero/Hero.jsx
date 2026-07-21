import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Background Image */}
      <div className="hero-background"></div>

      {/* Dark Overlay */}
      <div className="hero-overlay">

        <div className="hero-content">

          <div className="featured-label">
            🔥 FEATURED MOVIE
          </div>

          <h1>
            Enola
            <br />
            <span>Holmes 3</span>
          </h1>

          <div className="hero-meta">
            <span className="rating">
              ⭐ 8.5
            </span>

            <span>•</span>
            <span>Mystery</span>

            <span>•</span>
            <span>English</span>

            <span>•</span>
            <span>2h 10m</span>
          </div>

          <p className="hero-description">
            Enola Holmes returns for another thrilling mystery, using
            her sharp mind, courage, and detective skills to uncover
            secrets and solve a case unlike anything she has faced before.
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
              <strong>8.5</strong>
              <small>IMDb Rating</small>
            </div>

            <div>
              <strong>2026</strong>
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