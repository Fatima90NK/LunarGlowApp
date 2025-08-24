//This file is for connecting to the MongoDB database and exporting the collection to be used in other files
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // MongoDB in Docker
const client = new MongoClient(uri);

await client.connect();
const db = client.db("moon_app"); // Database name
export const moonCollection = db.collection("moonData");

