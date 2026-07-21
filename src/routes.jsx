import { BrowserRouter, Routes, Route } from "react-router-dom";
import TheatreSelection from "./pages/TheatreSelection/TheatreSelection";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import NotFound from "./pages/NotFound/NotFound";
import SeatSelection from "./pages/SeatSelection/SeatSelection";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route
    path="/seats/:movieId/:theatreId/:time"
    element={<SeatSelection />}
/>
        <Route
  path="/theatres/:id"
  element={<TheatreSelection />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;