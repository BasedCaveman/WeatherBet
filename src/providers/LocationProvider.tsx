"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { City, searchCities, getWeatherForecast, getClimateAverages, WeatherData, ClimateAverages, POPULAR_CITIES } from "@/lib/weather";

interface LocationContextType {
  // Current location
  city: City | null;
  setCity: (city: City) => void;
  
  // Weather data
  weather: WeatherData | null;
  climate: ClimateAverages | null;
  
  // Loading states
  isDetecting: boolean;
  isLoadingWeather: boolean;
  
  // Actions
  detectLocation: () => Promise<void>;
  searchCity: (query: string) => Promise<City[]>;
  
  // Popular cities
  popularCities: City[];
  
  // Error
  error: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const STORAGE_KEY = "weatherbet_city";

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<City | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [climate, setClimate] = useState<ClimateAverages | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved city on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const savedCity = JSON.parse(saved) as City;
          setCityState(savedCity);
        } catch {
          // Invalid saved data, ignore
        }
      }
    }
  }, []);

  // Fetch weather when city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = async (targetCity: City) => {
    setIsLoadingWeather(true);
    setError(null);
    
    try {
      const [weatherData, climateData] = await Promise.all([
        getWeatherForecast(targetCity),
        getClimateAverages(targetCity),
      ]);
      
      setWeather(weatherData);
      setClimate(climateData);
    } catch (err) {
      console.error("Failed to fetch weather:", err);
      setError("Failed to load weather data");
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const setCity = useCallback((newCity: City) => {
    setCityState(newCity);
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCity));
    }
  }, []);

  const detectLocation = useCallback(async () => {
    setIsDetecting(true);
    setError(null);

    try {
      // Try GPS first
      if ("geolocation" in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes cache
          });
        });

        const { latitude, longitude } = position.coords;
        
        // Search for nearest city using coordinates
        // Open-Meteo doesn't have reverse geocoding, so we'll use IP fallback
        // or search for a city near these coordinates
        const nearbyCity = await findNearestCity(latitude, longitude);
        
        if (nearbyCity) {
          setCity(nearbyCity);
          setIsDetecting(false);
          return;
        }
      }
    } catch (gpsError) {
      console.log("GPS failed, trying IP fallback:", gpsError);
    }

    // Fallback to IP-based geolocation
    try {
      const response = await fetch("https://ip-api.com/json/?fields=city,country,countryCode,lat,lon,timezone");
      
      if (response.ok) {
        const data = await response.json();
        
        // Search for the city by name to get proper ID
        const cities = await searchCities(data.city);
        
        if (cities.length > 0) {
          // Find best match
          const match = cities.find(c => 
            c.countryCode.toLowerCase() === data.countryCode.toLowerCase()
          ) || cities[0];
          
          setCity(match);
        } else {
          // Create city from IP data
          setCity({
            id: Math.floor(data.lat * 1000 + data.lon),
            name: data.city || "Your Location",
            country: data.country,
            countryCode: data.countryCode,
            latitude: data.lat,
            longitude: data.lon,
            timezone: data.timezone,
          });
        }
      }
    } catch (ipError) {
      console.error("IP geolocation failed:", ipError);
      setError("Could not detect location. Please select a city.");
    }

    setIsDetecting(false);
  }, [setCity]);

  const searchCity = useCallback(async (query: string): Promise<City[]> => {
    return searchCities(query);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        city,
        setCity,
        weather,
        climate,
        isDetecting,
        isLoadingWeather,
        detectLocation,
        searchCity,
        popularCities: POPULAR_CITIES,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}

// Helper to find nearest city from coordinates
async function findNearestCity(lat: number, lon: number): Promise<City | null> {
  // Find closest from popular cities first
  let closestCity: City | null = null;
  let closestDistance = Infinity;

  for (const city of POPULAR_CITIES) {
    const distance = getDistance(lat, lon, city.latitude, city.longitude);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCity = city;
    }
  }

  // If within 100km of a popular city, use it
  if (closestCity && closestDistance < 100) {
    return closestCity;
  }

  // Otherwise create a custom location
  return {
    id: Math.floor(lat * 10000 + lon * 100),
    name: "Your Location",
    country: "Detected",
    countryCode: "XX",
    latitude: lat,
    longitude: lon,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

// Haversine distance in km
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
