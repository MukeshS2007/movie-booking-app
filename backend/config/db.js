const mongoose = require("mongoose");
const dns = require("dns");

const DEFAULT_LOCAL_URI = "mongodb://127.0.0.1:27017/moviebooking";
let dbMode = "mongo";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || DEFAULT_LOCAL_URI;
  let triedDnsFallback = false;

  const tryConnect = async () => {
    return mongoose.connect(mongoUri, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });
  };

  try {
    const connection = await tryConnect();
    console.log(`MongoDB Connected: ${connection.connection.host} ✅`);
  } catch (error) {
    console.error("MongoDB Connection Failed ❌");
    console.error(error.message);

    if (!triedDnsFallback && mongoUri.startsWith("mongodb+srv://") && error.message.includes("ECONNREFUSED")) {
      triedDnsFallback = true;
      console.log("SRV lookup failed — retrying with public DNS servers (8.8.8.8)...");
      dns.setServers(["8.8.8.8", "8.8.4.4"]);
      try {
        const connection = await tryConnect();
        console.log(`MongoDB Connected after DNS fallback: ${connection.connection.host} ✅`);
        return;
      } catch (err) {
        console.error("Retry with public DNS failed:", err.message);
      }
    }

    if (mongoUri !== DEFAULT_LOCAL_URI) {
      console.log("Attempting fallback to local MongoDB at", DEFAULT_LOCAL_URI);
      try {
        const connection = await mongoose.connect(DEFAULT_LOCAL_URI, {
          family: 4,
          serverSelectionTimeoutMS: 10000,
        });
        console.log(`MongoDB Connected to local fallback: ${connection.connection.host} ✅`);
        return;
      } catch (localError) {
        console.error("Local MongoDB fallback failed ❌", localError.message);
      }
    }

    dbMode = "mock";
    console.warn("MongoDB unavailable. Running in mock data mode.");
  }
};

const isMockMode = () => dbMode === "mock";

module.exports = {
  connectDB,
  isMockMode,
};
