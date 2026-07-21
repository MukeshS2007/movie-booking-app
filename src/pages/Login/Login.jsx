import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Background */}
      <div className="login-background"></div>

      {/* Overlay */}
      <div className="login-overlay">

        {/* Brand */}
        <div className="login-brand">
          <div className="brand-icon">🎬</div>

          <div>
            <h1>CineBook</h1>
            <p>Your movie. Your moment.</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="login-card">

          <div className="login-header">
            <span className="login-label">
              WELCOME BACK
            </span>

            <h2>Sign in to continue</h2>

            <p>
              Book your next cinematic experience.
            </p>
          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">
                <span>✉️</span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

            </div>

            {/* Password */}
            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">
                <span>🔒</span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

            </div>

            {/* Options */}
            <div className="login-options">

              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />

                <span>Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="forgot-password"
              >
                Forgot password?
              </Link>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}

              {!loading && <span>→</span>}
            </button>

          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Register */}
          <p className="register-text">
            Don't have an account?

            <Link to="/register">
              Create account
            </Link>
          </p>

        </div>

        {/* Footer */}
        <p className="login-footer">
          © 2026 CineBook. Your gateway to great cinema.
        </p>

      </div>

    </div>
  );
}

export default Login;