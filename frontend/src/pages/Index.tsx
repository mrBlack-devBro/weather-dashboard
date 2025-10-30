import { useState, useEffect } from "react";
import { toast } from "sonner";
import WeatherBackground from "@/components/WeatherBackground";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastCards from "@/components/ForecastCards";
import HourlyForecast from "@/components/HourlyForecast";
import WeatherMap from "@/components/WeatherMap";
import WeatherAlerts from "@/components/WeatherAlerts";
import SearchBar from "@/components/SearchBar";
import { Loader2 } from "lucide-react";
import { WeatherData, ForecastDay, HourlyForecast as HourlyForecastType, WeatherAlert } from "@/types/weather";
import { getCurrentWeather, getForecast, getWeatherAlerts } from "@/services/weatherService";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastType[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  const loadWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const [weather, forecastData, weatherAlerts] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
        getWeatherAlerts(lat, lon),
      ]);

      setCurrentWeather(weather);
      setForecast(forecastData);
      setHourlyForecast([]); // Set to empty or handle accordingly
      setAlerts(weatherAlerts);
    } catch (error) {
      toast.error("Failed to load weather data from server.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => loadWeatherData(pos.coords.latitude, pos.coords.longitude),
        () => loadWeatherData(51.5074, -0.1278) // Default to London
      );
    } else {
      loadWeatherData(51.5074, -0.1278);
    }
  }, []);

  const isNight = currentWeather
    ? new Date().getTime() / 1000 < currentWeather.sunrise ||
      new Date().getTime() / 1000 > currentWeather.sunset
    : false;

  return (
    <>
      <WeatherBackground condition={currentWeather?.condition || "clear"} isNight={isNight} />
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 animate-fade-in">
              Weather Dashboard
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in">
              Real-time weather updates and forecasts
            </p>
          </div>

          <SearchBar onLocationSelect={loadWeatherData} />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : currentWeather ? (
            <>
              <WeatherAlerts alerts={alerts} />
              <CurrentWeather data={currentWeather} isNight={isNight} />
              <HourlyForecast hourly={hourlyForecast} />
              <ForecastCards forecast={forecast} />
              {currentWeather?.lat && currentWeather?.lon && (
                <WeatherMap lat={currentWeather.lat} lon={currentWeather.lon} />
              )}
            </>
          ) : (
            <p className="text-center text-muted-foreground py-20">
              Loading weather data...
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
