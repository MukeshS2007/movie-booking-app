const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, isMockMode } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);
app.get("/", (req, res) => {
  res.send("Movie Booking API is Running 🚀");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  if (isMockMode()) {
    console.warn("Warning: backend is running in mock data mode. No MongoDB connection is available.");
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});