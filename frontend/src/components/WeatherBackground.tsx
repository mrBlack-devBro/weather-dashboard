import { useEffect, useState } from "react";

interface WeatherBackgroundProps {
  condition: string;
  isNight: boolean;
}

const WeatherBackground = ({ condition, isNight }: WeatherBackgroundProps) => {
  const [gradient, setGradient] = useState<string>("");

  useEffect(() => {
    let newGradient = "";

    if (isNight) {
      newGradient =
        "linear-gradient(135deg, hsl(var(--weather-night-start)), hsl(var(--weather-night-end)))";
      document.body.classList.add("night-mode");
    } else {
      document.body.classList.remove("night-mode");

      switch (condition.toLowerCase()) {
        case "clear":
        case "sunny":
          newGradient =
            "linear-gradient(135deg, hsl(var(--weather-sunny-start)), hsl(var(--weather-sunny-end)))";
          break;
        case "clouds":
        case "cloudy":
          newGradient =
            "linear-gradient(135deg, hsl(var(--weather-cloudy-start)), hsl(var(--weather-cloudy-end)))";
          break;
        case "rain":
        case "drizzle":
        case "thunderstorm":
          newGradient =
            "linear-gradient(135deg, hsl(var(--weather-rainy-start)), hsl(var(--weather-rainy-end)))";
          break;
        default:
          newGradient =
            "linear-gradient(135deg, hsl(var(--weather-sunny-start)), hsl(var(--weather-sunny-end)))";
      }
    }

    setGradient(newGradient);
  }, [condition, isNight]);

  return (
    <div
      className="fixed inset-0 -z-10 transition-all duration-1000"
      style={{ background: gradient }}
    />
  );
};

export default WeatherBackground;
