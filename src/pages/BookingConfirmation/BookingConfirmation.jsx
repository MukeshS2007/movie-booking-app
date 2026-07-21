import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BookingConfirmation.css";

function BookingConfirmation() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/bookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBooking(response.data);
      } catch (error) {
        console.error(
          "Error fetching booking:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="confirmation-status">
        <div className="confirmation-loader"></div>
        <p>Loading your ticket...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="confirmation-status">
        <h2>🎟️ Booking not found</h2>

        <Link to="/">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="confirmation-page">

      {/* Success Header */}
      <div className="success-header">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Booking Confirmed!
        </h1>

        <p>
          Your movie tickets are ready 🎬
        </p>

      </div>

      {/* Ticket */}
      <div className="movie-ticket">

        {/* Ticket Top */}
        <div className="ticket-main">

          {/* Poster */}
          <div className="ticket-poster-section">

            <img
              src={booking.movie.poster}
              alt={booking.movie.title}
              className="ticket-poster"
            />

            <div className="movie-rating">
              ⭐ {booking.movie.rating}
            </div>

          </div>

          {/* Movie Details */}
          <div className="ticket-movie-info">

            <span className="ticket-label">
              🎬 MOVIE TICKET
            </span>

            <h2>
              {booking.movie.title}
            </h2>

            <p className="movie-meta">
              {booking.movie.genre}
              {" • "}
              {booking.movie.language}
              {" • "}
              {booking.movie.duration}
            </p>

            <div className="ticket-details">

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
                <span>💰 TOTAL PAID</span>

                <strong className="ticket-price">
                  ₹{booking.totalPrice}
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="ticket-divider">
          <span></span>
          <div></div>
          <span></span>
        </div>

        {/* Ticket Bottom */}
        <div className="ticket-bottom">

          <div className="booking-id-section">

            <span>
              BOOKING ID
            </span>

            <strong>
              {booking._id}
            </strong>

            <small>
              Booked on{" "}
              {new Date(
                booking.createdAt
              ).toLocaleString()}
            </small>

          </div>

          <div className="qr-code">

            <div className="qr-pattern">
              ▦
            </div>

            <small>
              Scan to verify
            </small>

          </div>

        </div>

      </div>

      {/* Action Buttons */}
      <div className="confirmation-actions">

        <Link
          to="/my-bookings"
          className="primary-action"
        >
          🎟️ View My Bookings
        </Link>

        <Link
          to="/"
          className="secondary-action"
        >
          ← Back to Home
        </Link>

      </div>

      <p className="thank-you">
        Thank you for booking with MovieBooking 🍿
      </p>

    </div>
  );
}

export default BookingConfirmation;