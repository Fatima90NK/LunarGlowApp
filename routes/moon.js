// routes/moon.js
import express from 'express'; // Importing express
import { moonCollection, phaseDescriptionCollection } from '../model/database.js';// Importing the MongoDB collections
import OpenAI from 'openai'; // Importing OpenAI client
import 'dotenv/config'; // Loading environment variables

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Initializing OpenAI client

const router = express.Router(); // Creating a new router

// Compute the current moon phase (0 = New Moon, 0.25 = First Quarter,
// 0.5 = Full Moon, 0.75 = Last Quarter) using a known reference new moon.
function computeMoonPhase() {
  // Reference new moon: 6 January 2000 18:14 UTC
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const synodicPeriod = 29.53059; // average days per lunar cycle
  const daysSince = (Date.now() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  let phase = (daysSince % synodicPeriod) / synodicPeriod;
  if (phase < 0) phase += 1;
  return Math.round(phase * 1000) / 1000;
}

// GET moon data based on latitude and longitude
router.get('/:lat/:lon', async (req, res) => { // Route to get moon data for specific lat/lon
  const { lat, lon } = req.params; // Extracting latitude and longitude from request parameters
  const today = new Date().toISOString().split('T')[0]; // Getting today's date in YYYY-MM-DD format

  try {
    // Check if data already exists in MongoDB (optional — skipped if DB is unavailable)
    if (moonCollection) {
      const cached = await moonCollection.findOne({ lat, lon, date: today });
      if (cached) return res.json(cached);
    }

    // Compute moon phase locally — no external API key required
    const moonphase = computeMoonPhase();
    const moonData = {
        lat,
        lon,
        date: today,
        moonphase,
        moonrise: null,
        moonset: null
    }; // Building moon data object

    // Store data in MongoDB (optional — skipped if DB is unavailable)
    if (moonCollection) {
      await moonCollection.insertOne(moonData);
    }

    res.json(moonData); // Sending the moon data as JSON response
  } catch (err) { // Error handling
    console.error(err); // Logging the error
    res.status(500).json({ error: "Failed to fetch moon data" }); // Sending error response
  }
});

// Maps a moon phase float (0–1) to one of 8 phase name strings
// Convention: 0 = New Moon, 0.25 = First Quarter, 0.5 = Full Moon, 0.75 = Last Quarter
function getMoonPhaseLabel(moonPhase) {
  if (moonPhase <= 0.025 || moonPhase >= 0.975) return "New Moon";
  if (moonPhase > 0.025 && moonPhase < 0.225) return "Waxing Crescent Moon";
  if (moonPhase >= 0.225 && moonPhase <= 0.275) return "First Quarter Moon";
  if (moonPhase > 0.275 && moonPhase < 0.475) return "Waxing Gibbous Moon";
  if (moonPhase >= 0.475 && moonPhase <= 0.525) return "Full Moon";
  if (moonPhase > 0.525 && moonPhase < 0.725) return "Waning Gibbous Moon";
  if (moonPhase >= 0.725 && moonPhase <= 0.775) return "Last Quarter Moon";
  if (moonPhase > 0.775 && moonPhase < 0.975) return "Waning Crescent Moon";
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
    // Return cached description if available (optional — skipped if DB is unavailable)
    if (phaseDescriptionCollection) {
      const cached = await phaseDescriptionCollection.findOne({ phase: phaseName, month });
      if (cached) return res.json({ description: cached.description });
    }

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

    // Store in MongoDB for future requests (optional — skipped if DB is unavailable)
    if (phaseDescriptionCollection) {
      await phaseDescriptionCollection.insertOne({ phase: phaseName, month, description });
    }

    res.json({ description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch phase description" });
  }
});

export default router;
