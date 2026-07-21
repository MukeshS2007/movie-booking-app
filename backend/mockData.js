const movies = [
  {
    _id: "movie1",
    title: "The Adventure Begins",
    description: "An epic journey of discovery and heroism.",
    poster: "https://via.placeholder.com/300x450.png?text=Adventure+Begins",
    genre: "Action",
    duration: "2h 10m",
    language: "English",
    rating: 8.2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "movie2",
    title: "Mystery at the Moonlight",
    description: "A thrilling mystery that unravels under the stars.",
    poster: "https://via.placeholder.com/300x450.png?text=Mystery+Moonlight",
    genre: "Thriller",
    duration: "1h 55m",
    language: "English",
    rating: 7.9,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const users = [];
const bookings = [];

const generateId = () => `${Date.now()}${Math.floor(Math.random() * 10000)}`;

const getMovieById = (id) => movies.find((movie) => movie._id === id);
const getBookingById = (id) => bookings.find((booking) => booking._id === id);
const getUserByEmail = (email) => users.find((user) => user.email === email);
const getUserById = (id) => users.find((user) => user._id === id);

const addMovie = (data) => {
  const movie = {
    _id: generateId(),
    title: data.title,
    description: data.description,
    poster: data.poster,
    genre: data.genre,
    duration: data.duration,
    language: data.language,
    rating: data.rating || 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  movies.push(movie);
  return movie;
};

const addUser = ({ name, email, password }) => {
  const user = {
    _id: generateId(),
    name,
    email,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(user);
  return user;
};

const addBooking = ({ movie, showDate, showTime, seats, totalPrice, user }) => {
  const booking = {
    _id: generateId(),
    movie,
    showDate,
    showTime,
    seats,
    totalPrice,
    user,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  bookings.push(booking);
  return booking;
};

const getBookingsByUser = (userId) => bookings.filter((booking) => booking.user === userId);

const getBookings = ({ movieId, showDate, showTime }) =>
  bookings.filter(
    (booking) =>
      booking.movie === movieId &&
      booking.showDate === showDate &&
      booking.showTime === showTime
  );

const findExistingBooking = ({ movie, showDate, showTime, seats }) =>
  bookings.find(
    (booking) =>
      booking.movie === movie &&
      booking.showDate === showDate &&
      booking.showTime === showTime &&
      booking.seats.some((seat) => seats.includes(seat))
  );

const populateBooking = (booking) => {
  if (!booking) return null;
  const movie = getMovieById(booking.movie);
  return {
    ...booking,
    movie: movie || booking.movie,
  };
};

module.exports = {
  movies,
  users,
  bookings,
  getMovieById,
  getBookingById,
  getUserByEmail,
  getUserById,
  addMovie,
  addUser,
  addBooking,
  getBookingsByUser,
  getBookings,
  findExistingBooking,
  populateBooking,
};
