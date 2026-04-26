// routes/moon.js
import express from 'express'; // Importing express
import { moonCollection, phaseDescriptionCollection } from '../model/database.js';// Importing the MongoDB collections
import fetch from 'node-fetch'; // Importing node-fetch for making API requests
import OpenAI from 'openai'; // Importing OpenAI client
import 'dotenv/config'; // Loading environment variables

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Initializing OpenAI client

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

// Maps a moon phase float (0–1) to one of 8 phase name strings
function getMoonPhaseLabel(moonPhase) {
  if (moonPhase === 0 || moonPhase === 1) return "Full Moon";
  if (moonPhase > 0 && moonPhase < 0.25) return "Waning Gibbous Moon";
  if (moonPhase === 0.25) return "Last Quarter";
  if (moonPhase > 0.25 && moonPhase < 0.5) return "Waning Crescent Moon";
  if (moonPhase === 0.5) return "New Moon";
  if (moonPhase > 0.5 && moonPhase < 0.75) return "Waxing Crescent Moon";
  if (moonPhase === 0.75) return "First Quarter Moon";
  if (moonPhase > 0.75 && moonPhase < 1) return "Waxing Gibbous Moon";
  return "Unknown";
}

// GET /api/moon/description?phase=<float>
// Returns a ~100-word sidebar description for the current moon phase and month.
// Checks MongoDB cache first; calls OpenAI if not cached.
router.get('/description', async (req, res) => {
  const phase = parseFloat(req.query.phase);
  if (isNaN(phase) || phase < 0 || phase > 1) {
    return res.status(400).json({ error: "Invalid phase value. Must be a float between 0 and 1." });
  }

  const phaseName = getMoonPhaseLabel(phase);
  const month = new Date().getMonth() + 1; // 1–12

  try {
    // Return cached description if available
    const cached = await phaseDescriptionCollection.findOne({ phase: phaseName, month });
    if (cached) return res.json({ description: cached.description });

    // Generate a new description via OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Write a short, ~100-word sidebar description for the ${phaseName} occurring in month ${month} of the year. The tone should be mystical and reflective, suitable for a moon phase app.`
        }
      ],
      max_tokens: 150
    });

    const description = completion.choices[0].message.content.trim();

    // Store in MongoDB for future requests
    await phaseDescriptionCollection.insertOne({ phase: phaseName, month, description });

    res.json({ description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch phase description" });
  }
});

export default router;
