//This file is for connecting to the MongoDB database and exporting the collection to be used in other files
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // MongoDB in Docker
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });

export let moonCollection = null;
export let phaseDescriptionCollection = null;

try {
  await client.connect();
  const db = client.db("moon_app"); // Database name
  moonCollection = db.collection("moonData");
  phaseDescriptionCollection = db.collection("phaseDescriptions");
  console.log("MongoDB connected");
} catch (err) {
  console.warn("MongoDB not available, running without cache:", err.message);
}

