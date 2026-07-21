const express = require("express");

const {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies);

router.get("/:id", getMovieById);

router.post("/", addMovie);

router.delete(
  "/:id",
  deleteMovie
);

module.exports = router;