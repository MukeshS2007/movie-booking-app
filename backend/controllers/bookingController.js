const Booking = require("../models/Booking");
const { isMockMode } = require("../config/db");
const mockData = require("../mockData");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const {
      movie,
      showDate,
      showTime,
      seats,
      totalPrice,
    } = req.body;

    // Validate all required fields
    if (
      !movie ||
      !showDate ||
      !showTime ||
      !seats ||
      seats.length === 0 ||
      !totalPrice
    ) {
      return res.status(400).json({
        message: "Please provide all booking details",
      });
    }

    if (isMockMode()) {
      const existingBooking = mockData.findExistingBooking({
        movie,
        showDate,
        showTime,
        seats,
      });

      if (existingBooking) {
        return res.status(400).json({
          message:
            "One or more selected seats are already booked for this show",
        });
      }

      const booking = mockData.addBooking({
        movie,
        showDate,
        showTime,
        seats,
        totalPrice,
        user: req.user,
      });

      return res.status(201).json({
        message: "Booking created successfully",
        booking,
      });
    }

    const existingBooking = await Booking.findOne({
      movie,
      showDate,
      showTime,
      seats: { $in: seats },
    });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "One or more selected seats are already booked for this show",
      });
    }

    // Create booking
    const booking = await Booking.create({
      movie,
      showDate,
      showTime,
      seats,
      totalPrice,
      user: req.user,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET MY BOOKINGS
const getMyBookings = async (req, res) => {
  try {
    if (isMockMode()) {
      const bookings = mockData
        .getBookingsByUser(req.user)
        .map((booking) => mockData.populateBooking(booking));
      return res.status(200).json(bookings);
    }

    const bookings = await Booking.find({
      user: req.user,
    }).populate("movie");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET BOOKED SEATS
const getBookedSeats = async (req, res) => {
  try {
    const {
      movieId,
      showDate,
      showTime,
    } = req.query;

    if (isMockMode()) {
      const bookings = mockData.getBookings({
        movieId,
        showDate,
        showTime,
      });
      const bookedSeats = bookings.flatMap(
        (booking) => booking.seats
      );
      return res.status(200).json(bookedSeats);
    }

    const bookings = await Booking.find({
      movie: movieId,
      showDate,
      showTime,
    });

    const bookedSeats = bookings.flatMap(
      (booking) => booking.seats
    );

    res.status(200).json(bookedSeats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET BOOKING BY ID
const getBookingById = async (req, res) => {
  try {
    if (isMockMode()) {
      const booking = mockData.populateBooking(
        mockData.getBookingById(req.params.id)
      );
      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }
      return res.status(200).json(booking);
    }

    const booking = await Booking.findById(
      req.params.id
    ).populate("movie");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createBooking,
  getMyBookings,
  getBookedSeats,
  getBookingById,
};