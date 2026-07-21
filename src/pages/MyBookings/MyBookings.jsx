import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="bookings-status">
        <div className="bookings-loader"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">

      {/* Header */}
      <div className="bookings-header">
        <span>🎟️ YOUR MOVIE JOURNEY</span>

        <h1>My Bookings</h1>

        <p>
          Your tickets, your memories, your movies 🎬
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings">

          <div className="empty-icon">
            🎬
          </div>

          <h2>No bookings yet</h2>

          <p>
            Your next movie adventure is waiting for you!
          </p>

          <Link
            to="/"
            className="browse-movies-btn"
          >
            🎥 Browse Movies
          </Link>

        </div>
      ) : (
        <div className="bookings-container">

          {bookings.map((booking) => (

            <div
              className="booking-ticket"
              key={booking._id}
            >

              {/* Movie Poster */}
              <div className="booking-poster-section">

                <img
                  src={booking.movie.poster}
                  alt={booking.movie.title}
                />

                <div className="poster-rating">
                  ⭐ {booking.movie.rating}
                </div>

              </div>

              {/* Booking Details */}
              <div className="booking-details">

                <div className="booking-top">

                  <div>
                    <span className="booking-label">
                      MOVIE TICKET
                    </span>

                    <h2>
                      {booking.movie.title}
                    </h2>

                    <p className="movie-info">
                      {booking.movie.genre}
                      {" • "}
                      {booking.movie.language}
                      {" • "}
                      {booking.movie.duration}
                    </p>
                  </div>

                  <span className="booking-status">
                    ✓ CONFIRMED
                  </span>

                </div>

                <div className="booking-info-grid">

                  <div>
                    <span>📅 SHOW DATE</span>

                    <strong>
                      {booking.showDate}
                    </strong>
                  </div>

                  <div>
                    <span>⏰ SHOW TIME</span>

                    <strong>
                      {booking.showTime}
                    </strong>
                  </div>

                  <div>
                    <span>💺 SEATS</span>

                    <strong>
                      {booking.seats.join(", ")}
                    </strong>
                  </div>

                  <div>
                    <span>💰 TOTAL</span>

                    <strong className="booking-price">
                      ₹{booking.totalPrice}
                    </strong>
                  </div>

                </div>

                <div className="booking-bottom">

                  <div>
                    <span>BOOKING ID</span>

                    <p>
                      {booking._id}
                    </p>
                  </div>

                  <Link
                    to={`/booking-confirmation/${booking._id}`}
                    className="view-ticket-btn"
                  >
                    View Ticket 🎟️
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default MyBookings;