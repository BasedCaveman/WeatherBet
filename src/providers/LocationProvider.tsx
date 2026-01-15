"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
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

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocation must be used within LocationProvider");
  return context;
};
