import { WeatherData } from "@/types/weather";
import { Cloud, Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CurrentWeatherProps {
  data: WeatherData;
  isNight: boolean;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  return (
    <div className="animate-fade-in">
      <Card className="p-8 bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
              alt={data.condition}
              className="w-32 h-32 animate-pulse-glow"
            />
            <div>
              <h3 className="text-5xl font-bold temperature-text">
                {data.temperature}°C
              </h3>
              <p className="text-2xl text-muted-foreground mt-2 capitalize">
                {data.description}
              </p>
              <p className="text-lg text-muted-foreground mt-1">
                Feels like {data.feelsLike}°C
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-3xl font-bold text-foreground">
              {data.location}
            </h3>
            <p className="text-xl text-muted-foreground">{data.country}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8 pt-8 border-t border-border/50">
          <WeatherDetail
            icon={<Droplets className="w-5 h-5" />}
            label="Humidity"
            value={`${data.humidity}%`}
          />
          <WeatherDetail
            icon={<Wind className="w-5 h-5" />}
            label="Wind Speed"
            value={`${data.windSpeed} km/h`}
          />
          <WeatherDetail
            icon={<Gauge className="w-5 h-5" />}
            label="Pressure"
            value={`${data.pressure} hPa`}
          />
          <WeatherDetail
            icon={<Eye className="w-5 h-5" />}
            label="Visibility"
            value={`${data.visibility} km`}
          />
          <WeatherDetail
            icon={<Sunrise className="w-5 h-5" />}
            label="Sunrise"
            value={new Date(data.sunrise * 1000).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          />
          <WeatherDetail
            icon={<Sunset className="w-5 h-5" />}
            label="Sunset"
            value={new Date(data.sunset * 1000).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          />
        </div>
      </Card>
    </div>
  );
};

const WeatherDetail = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/30">
    <div className="text-primary">{icon}</div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold text-foreground">{value}</p>
  </div>
);

export default CurrentWeather;
