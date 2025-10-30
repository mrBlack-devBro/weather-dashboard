import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySubmit: (key: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="p-8 max-w-md w-full bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-center mb-6">
          <Key className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          Welcome to Weather Dashboard
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Please enter your OpenWeatherMap API key to get started
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-background/50 border-border/50"
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Get Started
          </Button>
        </form>
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Don't have an API key?{" "}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get one free from OpenWeatherMap
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ApiKeyInput;
