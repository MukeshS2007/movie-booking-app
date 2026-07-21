import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./SeatSelection.css";

function SeatSelection() {

    const { movieId, theatreId, time } = useParams();

    const [selectedSeats, setSelectedSeats] = useState([]);

    const seats = [];

    const rows = ["A", "B", "C", "D", "E"];

    rows.forEach((row) => {
        for (let i = 1; i <= 8; i++) {
            seats.push(row + i);
        }
    });

    function handleSeatClick(seat) {

        if (selectedSeats.includes(seat)) {

            setSelectedSeats(
                selectedSeats.filter((s) => s !== seat)
            );

        } else {

            setSelectedSeats([...selectedSeats, seat]);

        }

    }

    return (
        <>
            <Navbar />

            <div className="seat-page">

                <h2>Select Seats</h2>

                <p>Movie ID : {movieId}</p>

                <p>Theatre ID : {theatreId}</p>

                <p>Show Time : {decodeURIComponent(time)}</p>

                <div className="screen">
                    SCREEN
                </div>

                <div className="seat-grid">

                    {seats.map((seat) => (

                        <button
                            key={seat}
                            className={
                                selectedSeats.includes(seat)
                                    ? "seat selected"
                                    : "seat"
                            }
                            onClick={() =>
                                handleSeatClick(seat)
                            }
                        >
                            {seat}
                        </button>

                    ))}

                </div>

                <h3>
                    Selected Seats:
                    {" "}
                    {selectedSeats.join(", ")}
                </h3>

                <h2>
                    Total:
                    {" "}
                    ₹{selectedSeats.length * 180}
                </h2>

                <button className="payment-btn">
                    Proceed to Payment
                </button>

            </div>

        </>
    );
}

export default SeatSelection;