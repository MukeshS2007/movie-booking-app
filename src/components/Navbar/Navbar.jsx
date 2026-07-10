import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🎬 MovieVerse</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">Movies</Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
        />
      </div>

      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/register">
          <button className="register-btn">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;