import { ForecastDay } from "@/types/weather";
import { Card } from "@/components/ui/card";
import { Droplets, Wind } from "lucide-react";

interface ForecastCardsProps {
  forecast: ForecastDay[];
}

const ForecastCards = ({ forecast }: ForecastCardsProps) => {
  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <Card
            key={index}
            className="p-6 bg-card/80 backdrop-blur-xl border-border/50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-3">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.condition}
                className="w-20 h-20 mx-auto"
              />
              
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-2xl font-bold text-foreground">
                  {day.tempMax}°
                </span>
                <span className="text-xl text-muted-foreground">
                  {day.tempMin}°
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-2 capitalize">
                {day.condition}
              </p>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Droplets className="w-4 h-4 text-primary" />
                  {day.pop}%
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Wind className="w-4 h-4 text-primary" />
                  {day.windSpeed}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForecastCards;
