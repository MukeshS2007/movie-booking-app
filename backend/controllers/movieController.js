const Movie = require("../models/Movie");
const { isMockMode } = require("../config/db");
const mockData = require("../mockData");

// Get all movies
const getMovies = async (req, res) => {
  try {
    if (isMockMode()) {
      return res.status(200).json(mockData.movies);
    }

    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get one movie by ID
const getMovieById = async (req, res) => {
  try {
    if (isMockMode()) {
      const movie = mockData.getMovieById(req.params.id);
      if (!movie) {
        return res.status(404).json({
          message: "Movie not found",
        });
      }
      return res.status(200).json(movie);
    }

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add a movie
const addMovie = async (req, res) => {
  try {
    if (isMockMode()) {
      const movie = mockData.addMovie(req.body);
      return res.status(201).json({
        message: "Movie added successfully",
        movie,
      });
    }

    const movie = await Movie.create(req.body);

    res.status(201).json({
      message: "Movie added successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteMovie = async (req, res) => {
  try {
    if (isMockMode()) {
      const index = mockData.movies.findIndex((movie) => movie._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({
          message: "Movie not found",
        });
      }
      mockData.movies.splice(index, 1);
      return res.status(200).json({
        message: "Movie deleted successfully",
      });
    }

    const movie = await Movie.findByIdAndDelete(
      req.params.id
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
};