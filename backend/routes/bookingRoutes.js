const express = require("express");

const {
  createBooking,
  getMyBookings,
  getBookedSeats,
  getBookingById,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);

router.get(
  "/booked-seats",
  getBookedSeats
);
router.get(
  "/:id",
  protect,
  getBookingById
);
module.exports = router;