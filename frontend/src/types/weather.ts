export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  lat: number;
  lon: number;
}

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pop: number; // Probability of precipitation
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  icon: string;
  pop: number;
}

export interface WeatherAlert {
  event: string;
  description: string;
  severity: string;
  start: number;
  end: number;
}
