const mongoose = require("mongoose");
const dns = require("dns");

const DEFAULT_LOCAL_URI = "mongodb://127.0.0.1:27017/moviebooking";
const PUBLIC_DNS_SERVERS = ["8.8.8.8", "1.1.1.1"];
let dbMode = "mongo";

const extractSrvHost = (mongoUri) =>
  mongoUri.replace(/^mongodb\+srv:\/\//, "").replace(/\/.*$/, "");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || DEFAULT_LOCAL_URI;
  let triedDnsFallback = false;
  const originalDnsServers = dns.getServers();

  const tryConnect = async () => {
    return mongoose.connect(mongoUri, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });
  };

  try {
    if (mongoUri.startsWith("mongodb+srv://")) {
      try {
        await dns.promises.resolveSrv(`_mongodb._tcp.${extractSrvHost(mongoUri)}`);
      } catch (dnsError) {
        triedDnsFallback = true;
        console.warn(
          "SRV DNS lookup using system DNS success ✅ "
        );
        dns.setServers(PUBLIC_DNS_SERVERS);
      }
    }

    const connection = await tryConnect();
    console.log(`MongoDB Connected: ${connection.connection.host} ✅`);
    return;
  } catch (error) {
    console.warn("MongoDB connection failed on first attempt.");
    console.error(error.message);

    if (!triedDnsFallback && mongoUri.startsWith("mongodb+srv://") && error.message.includes("ECONNREFUSED")) {
      triedDnsFallback = true;
      console.log("SRV lookup failed — retrying with public DNS servers...");
      dns.setServers(PUBLIC_DNS_SERVERS);
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
  } finally {
    if (triedDnsFallback && originalDnsServers.length > 0) {
      dns.setServers(originalDnsServers);
    }
  }
};

const isMockMode = () => dbMode === "mock";

module.exports = {
  connectDB,
  isMockMode,
};
