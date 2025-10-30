// src/services/weatherService.ts (frontend)
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentWeather = async (lat: number, lon: number) => {
  const response = await fetch(`${BACKEND_URL}/current?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new Error("Failed to fetch current weather");
  return await response.json();
};

export const getForecast = async (lat: number, lon: number) => {
  const response = await fetch(`${BACKEND_URL}/forecast?lat=${lat}&lon=${lon}`);
  const data = await response.json();

  // Transform OpenWeatherMap data → your ForecastDay[] type
  if (!data.list) return [];

  const daily = data.list
    .filter((_: WeatherDataItem, index: number) => index % 8 === 0) // roughly 1 per day (3-hour intervals)
    .map((item: WeatherDataItem) => ({
      date: item.dt * 1000,
      icon: item.weather[0].icon,
      condition: item.weather[0].description,
      tempMax: Math.round(item.main.temp_max),
      tempMin: Math.round(item.main.temp_min),
      pop: Math.round(item.pop * 100),
      windSpeed: Math.round(item.wind.speed),
    }));

  return daily;
};


interface WeatherDataItem {
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  pop?: number;
  wind: {
    speed: number;
  };
}

export const getHourlyForecast = async (lat: number, lon: number) => {
  const response = await fetch(`${BACKEND_URL}/forecast?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new Error("Failed to fetch hourly forecast");
  const data = await response.json();

  return data.list.slice(0, 8).map((item: WeatherDataItem) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" }),
    temperature: Math.round(item.main.temp),
    icon: item.weather[0].icon,
    pop: Math.round((item.pop || 0) * 100),
  }));
};

export const getWeatherAlerts = async (lat: number, lon: number) => {
  const response = await fetch(`${BACKEND_URL}/alerts?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new Error("Failed to fetch alerts");
  return await response.json();
};

export const searchLocation = async (query: string) => {
  const response = await fetch(`${BACKEND_URL}/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search location");
  return await response.json();
};
