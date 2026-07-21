const connectDB = async () => {
  console.warn("MongoDB not available. Running in mock data mode.");
  return Promise.resolve();
};

module.exports = connectDB;
