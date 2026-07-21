import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");

  const seats = [
    "A1", "A2", "A3", "A4", "A5",
    "B1", "B2", "B3", "B4", "B5",
    "C1", "C2", "C3", "C4", "C5",
    "D1", "D2", "D3", "D4", "D5",
  ];

  const ticketPrice = 200;

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!showDate || !showTime) {
        setBookedSeats([]);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookings/booked-seats",
          {
            params: {
              movieId: id,
              showDate,
              showTime,
            },
          }
        );

        setBookedSeats(response.data);
      } catch (error) {
        console.error(
          "Error fetching booked seats:",
          error
        );
      }
    };

    fetchBookedSeats();
  }, [id, showDate, showTime]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter(
          (selectedSeat) => selectedSeat !== seat
        )
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);
    }
  };

  const totalPrice =
    selectedSeats.length * ticketPrice;

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login before booking");
        return;
      }

      if (!showDate || !showTime) {
        alert(
          "Please select a date and show time"
        );
        return;
      }

      if (selectedSeats.length === 0) {
        alert(
          "Please select at least one seat"
        );
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          movie: id,
          showDate,
          showTime,
          seats: selectedSeats,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(
        `/booking-confirmation/${response.data.booking._id}`
      );

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    }
  };

  return (
    <div className="booking-page">

      <div className="booking-header">
        <p className="booking-label">
          🎬 MOVIEBOOKING
        </p>

        <h1>
          Select Your Seats
        </h1>

        <p>
          Choose your preferred date, showtime,
          and seats
        </p>
      </div>

      {/* Date and Time */}
      <div className="booking-selection">

        <div className="selection-box">
          <label>
            📅 SELECT DATE
          </label>

          <input
            type="date"
            value={showDate}
            onChange={(e) => {
              setShowDate(e.target.value);
              setSelectedSeats([]);
            }}
          />
        </div>

        <div className="selection-box">
          <label>
            ⏰ SELECT SHOW TIME
          </label>

          <select
            value={showTime}
            onChange={(e) => {
              setShowTime(e.target.value);
              setSelectedSeats([]);
            }}
          >
            <option value="">
              Choose a showtime
            </option>

            <option value="10:00 AM">
              10:00 AM
            </option>

            <option value="1:00 PM">
              1:00 PM
            </option>

            <option value="4:00 PM">
              4:00 PM
            </option>

            <option value="7:00 PM">
              7:00 PM
            </option>

            <option value="10:00 PM">
              10:00 PM
            </option>
          </select>
        </div>

      </div>

      {/* Screen */}
      <div className="screen-section">

        <div className="screen">
          SCREEN
        </div>

        <p className="screen-text">
          All eyes this way
        </p>

      </div>

      {/* Seats */}
      <div className="seat-section">

        <h2>
          💺 Choose Your Seats
        </h2>

        <div className="seat-layout">

          {seats.map((seat) => {

            const isSelected =
              selectedSeats.includes(seat);

            const isBooked =
              bookedSeats.includes(seat);

            return (
              <button
                key={seat}
                disabled={isBooked}
                onClick={() =>
                  handleSeatClick(seat)
                }
                className={`seat
                  ${isBooked ? "booked" : ""}
                  ${isSelected ? "selected" : ""}
                `}
              >
                {seat}
              </button>
            );
          })}

        </div>

        {/* Legend */}
        <div className="seat-legend">

          <div>
            <span className="legend-box available"></span>
            Available
          </div>

          <div>
            <span className="legend-box selected-box"></span>
            Selected
          </div>

          <div>
            <span className="legend-box booked-box"></span>
            Booked
          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="booking-summary">

        <div className="summary-header">
          <h2>
            Booking Summary
          </h2>

          <span>
            {selectedSeats.length} Tickets
          </span>
        </div>

        <div className="summary-details">

          <div>
            <span>📅 Date</span>

            <strong>
              {showDate || "Not selected"}
            </strong>
          </div>

          <div>
            <span>⏰ Showtime</span>

            <strong>
              {showTime || "Not selected"}
            </strong>
          </div>

          <div>
            <span>💺 Seats</span>

            <strong>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "None selected"}
            </strong>
          </div>

        </div>

        <div className="price-section">

          <span>Total Amount</span>

          <strong>
            ₹{totalPrice}
          </strong>

        </div>

        <button
          className="confirm-button"
          disabled={
            selectedSeats.length === 0 ||
            !showDate ||
            !showTime
          }
          onClick={handleBooking}
        >
          Confirm Booking
          <span>→</span>
        </button>

      </div>

    </div>
  );
}

export default Booking;