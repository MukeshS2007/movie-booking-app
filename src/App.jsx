import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Booking from "./pages/Booking/Booking";
import MyBookings from "./pages/MyBookings/MyBookings";
import BookingConfirmation from
  "./pages/BookingConfirmation/BookingConfirmation";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />
<Route
  path="/my-bookings"
  element={<MyBookings />}
/>
<Route
  path="/booking-confirmation/:id"
  element={<BookingConfirmation />}
/>
        <Route
          path="/book/:id"
          element={<Booking />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;