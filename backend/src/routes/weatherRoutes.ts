// src/routes/weatherRoutes.ts
import express from "express";
import { weatherService } from "../services/weatherService";

const router = express.Router();

router.get("/current", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "lat and lon required" });

  try {
    const data = await weatherService.getCurrentWeather(Number(lat), Number(lon));
    res.json(data);
  } catch (err: any) {
    console.error("Current weather error:", err.message);
    res.status(500).json({ error: "Failed to fetch current weather" });
  }
});

router.get("/forecast", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "lat and lon required" });

  try {
    const data = await weatherService.getForecast(Number(lat), Number(lon));
    res.json(data);
  } catch (err: any) {
    console.error("Forecast error:", err.message);
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
});

router.get("/alerts", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "lat and lon required" });

  try {
    const alerts = await weatherService.getWeatherAlerts(Number(lat), Number(lon));
    res.json(alerts);
  } catch (err: any) {
    console.error("Alerts error:", err.message);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Missing query parameter" });

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) return res.status(response.status).json({ error: "City not found" });

    const data = await response.json();

    res.json({
      name: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon,
      country: data.sys.country,
    });
  } catch (err: any) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
