"use client";

import { useLocation } from "@/providers/LocationProvider";

const LOCATIONS = [
  { id: "nyc", name: "New York City", lat: 40.7128, lon: -74.006 },
  { id: "la", name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { id: "london", name: "London", lat: 51.5074, lon: -0.1278 },
];

export function LocationSelector() {
  const { location, setLocation } = useLocation();

  return (
    <select
      value={location?.id || ""}
      onChange={(e) => {
        const loc = LOCATIONS.find((l) => l.id === e.target.value);
        if (loc) setLocation(loc);
      }}
      className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700"
    >
      {LOCATIONS.map((loc) => (
        <option key={loc.id} value={loc.id}>
          {loc.name}
        </option>
      ))}
    </select>
  );
}
