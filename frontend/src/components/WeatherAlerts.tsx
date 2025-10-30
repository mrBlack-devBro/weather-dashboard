import { WeatherAlert } from "@/types/weather";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Info } from "lucide-react";

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

const WeatherAlerts = ({ alerts }: WeatherAlertsProps) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-destructive" />
        Weather Alerts
      </h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <Card
            key={index}
            className="p-5 bg-destructive/10 backdrop-blur-xl border-destructive/30"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {alert.event}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {alert.description}
                </p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>
                    From: {new Date(alert.start * 1000).toLocaleString()}
                  </span>
                  <span>
                    To: {new Date(alert.end * 1000).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
