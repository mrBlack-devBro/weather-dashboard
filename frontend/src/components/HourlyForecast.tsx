import { HourlyForecast as HourlyForecastType } from "@/types/weather";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Droplets } from "lucide-react";

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

const HourlyForecast = ({ hourly }: HourlyForecastProps) => {
  return (
    <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
      <h2 className="text-2xl font-bold text-foreground mb-4">Hourly Forecast</h2>
      <Card className="p-6 bg-card/80 backdrop-blur-xl border-border/50">
        <ScrollArea className="w-full">
          <div className="flex gap-6 pb-4">
            {hourly.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{hour.time}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                  alt="weather"
                  className="w-12 h-12"
                />
                <p className="text-lg font-bold text-foreground">{hour.temperature}°</p>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Droplets className="w-3 h-3" />
                  {hour.pop}%
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
};

export default HourlyForecast;
