import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load ENV file
dotenv.config({
  path: path.resolve(__dirname, "../../config.env"),
});

// MongoDB URI
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI not found in config.env");
  process.exit(1);
}

// Mongo Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

// Connect MongoDB
async function connectDB() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log("✅ MongoDB Connected Successfully");

    db = client.db("ElderEase");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);

    if (
      err.message.includes("ECONNREFUSED") ||
      err.message.includes("querySrv")
    ) {
      console.log("⚠️ Fix Atlas Settings:");
      console.log("1. Whitelist IP: 0.0.0.0/0");
      console.log("2. Use Google DNS: 8.8.8.8");
      console.log("3. Check internet connection");
    }

    process.exit(1);
  }
}

await connectDB();

export default db;