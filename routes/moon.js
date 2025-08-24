// routes/moon.js
import express from 'express'; // Importing express
import { moonCollection } from '../model/database.js';// Importing the MongoDB collection
import fetch from 'node-fetch'; // Importing node-fetch for making API requests

const router = express.Router(); // Creating a new router

// GET moon data based on latitude and longitude
router.get('/:lat/:lon', async (req, res) => { // Route to get moon data for specific lat/lon
  const { lat, lon } = req.params; // Extracting latitude and longitude from request parameters
  const today = new Date().toISOString().split('T')[0]; // Getting today's date in YYYY-MM-DD format

  try {
    // Check if data already exists in MongoDB
    const cached = await moonCollection.findOne({ lat, lon, date: today });
    if (cached) return res.json(cached);

    // Fetch from external API
    const APIkey = "REDACTED";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=us&key=${APIkey}&include=days&elements=datetime,moonphase,moonrise,moonset`;
//    console.log("Fetching from URL:", url);
    const response = await fetch(url);// Making the API request
    const data = await response.json();// Parsing the JSON response
    const moonData = { 
        lat,
        lon,
        date: today,
        moonphase: data.days[0].moonphase,
        moonrise: data.days[0].moonrise,
        moonset: data.days[0].moonset
    }; // Extracting relevant moon data 

    // Store data in MongoDB
    await moonCollection.insertOne(moonData); // Inserting the new data into the collection
    res.json(moonData); // Sending the moon data as JSON response
  } catch (err) { // Error handling
    console.error(err); // Logging the error
    res.status(500).json({ error: "Failed to fetch moon data" }); // Sending error response 
  }
});

export default router;
