import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherService = {
  async getCurrentWeather(lat: number, lon: number) {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, units: "metric", appid: API_KEY },
    });

    const data = response.data;

    // Optional UV index (One Call endpoint, may fail on free plan)
    let uvIndex = 0;
    try {
      const oneCallRes = await axios.get(`${BASE_URL}/onecall`, {
        params: { lat, lon, exclude: "minutely,hourly,daily,alerts", units: "metric", appid: API_KEY },
      });
      uvIndex = oneCallRes.data.current?.uvi ?? 0;
    } catch {
      uvIndex = 0;
    }

    // ✅ Map OpenWeatherMap data → your frontend's WeatherData structure
    return {
      location: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      uvIndex,
      visibility: (data.visibility / 1000).toFixed(1), // km
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  },

  async getForecast(lat: number, lon: number) {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { lat, lon, units: "metric", appid: API_KEY },
    });
    return response.data;
  },

  async getWeatherAlerts(lat: number, lon: number) {
    console.log("✅ Backend getWeatherAlerts function reached!");
    console.warn("⚠️ Alerts are not available on the free OpenWeatherMap plan.");
    return [];
  },
};
