import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchLocation } from "@/services/weatherService";
import { toast } from "sonner";

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

const SearchBar = ({ onLocationSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchLocation(query);
        if (results && results.lat && results.lon) {
          onLocationSelect(results.lat, results.lon);
          toast.success(`Weather loaded for ${results.name}`);
        } else {
          toast.error("Location not found");
        }
    } catch (error) {
      toast.error("Failed to search location");
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect(position.coords.latitude, position.coords.longitude);
          toast.success("Using your current location");
        },
        () => {
          toast.error("Unable to get your location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="flex gap-2 mb-8 animate-fade-in">
      <form onSubmit={handleSearch} className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-card/80 backdrop-blur-xl border-border/50 text-foreground placeholder:text-muted-foreground h-12"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6"
        >
          Search
        </Button>
      </form>
      <Button
        onClick={handleCurrentLocation}
        variant="outline"
        className="bg-card/80 backdrop-blur-xl border-border/50 hover:bg-card h-12 px-6"
      >
        <MapPin className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
