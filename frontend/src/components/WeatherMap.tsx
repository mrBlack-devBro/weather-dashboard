import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface WeatherMapProps {
  lat: number;
  lon: number;
}

const WeatherMap = ({ lat, lon }: WeatherMapProps) => {
  useEffect(() => {
    const map = L.map("map").setView([lat, lon], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([lat, lon]).addTo(map);
    return () => { map.remove(); };
  }, [lat, lon]);

  return (
    <div className="animate-scale-in" style={{ animationDelay: "300ms" }}>
      <h2 className="text-2xl font-bold text-foreground mb-4">Weather Map</h2>
      <Card className="overflow-hidden bg-card/80 backdrop-blur-xl border-border/50">
        <div id="map" className="w-full h-[400px] rounded-lg" />
      </Card>
    </div>
  );
};

export default WeatherMap;
