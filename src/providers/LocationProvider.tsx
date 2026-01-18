"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface Weather {
  temp: number;
  description: string;
}

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
  city: string;
  weather: Weather | null;
  isDetecting: boolean;
  loadingWeather: boolean;
  detectLocation: () => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

const DEFAULT_LOCATION: Location = {
  id: "nyc",
  name: "New York City",
  lat: 40.7128,
  lon: -74.006,
};

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location | null>(DEFAULT_LOCATION);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);
    // Simple detection - just use default for now
    setTimeout(() => {
      setLocation(DEFAULT_LOCATION);
      setIsDetecting(false);
    }, 500);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        city: location?.name || "Unknown",
        weather,
        isDetecting,
        loadingWeather,
        detectLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocation must be used within LocationProvider");
  return context;
};
