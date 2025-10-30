import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { weatherService } from "./services/weatherService";
import weatherRoutes from "./routes/weatherRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/weather", weatherRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Weather API is running");
});

app.get("/api/weather/current", async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const data = await weatherService.getCurrentWeather(Number(lat), Number(lon));
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/weather/forecast", async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const data = await weatherService.getForecast(Number(lat), Number(lon));
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/weather/alerts", async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const data = await weatherService.getWeatherAlerts(Number(lat), Number(lon));
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
