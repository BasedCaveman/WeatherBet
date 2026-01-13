"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Navigation, X, ChevronDown, Loader2, Globe } from "lucide-react";
import { useLocation } from "@/providers/LocationProvider";
import { City } from "@/lib/weather";

interface LocationSelectorProps {
  compact?: boolean;
}

export function LocationSelector({ compact = false }: LocationSelectorProps) {
  const { city, setCity, detectLocation, searchCity, popularCities, isDetecting, error } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search cities as user types
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        const results = await searchCity(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchCity]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelectCity = (selectedCity: City) => {
    setCity(selectedCity);
    setIsOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleDetectLocation = async () => {
    await detectLocation();
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200 transition-colors text-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-slate-700 font-medium max-w-[120px] truncate">
            {city?.name || "Select"}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <LocationDropdown
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              isSearching={isSearching}
              popularCities={popularCities}
              onSelectCity={handleSelectCity}
              onDetectLocation={handleDetectLocation}
              isDetecting={isDetecting}
              inputRef={inputRef}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full-size version (for initial setup)
  return (
    <div className="w-full max-w-md mx-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-left">
            <p className="text-sm text-slate-500">Location</p>
            <p className="font-semibold text-slate-800">
              {city ? `${city.name}, ${city.countryCode}` : "Select your city"}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <LocationDropdown
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            isSearching={isSearching}
            popularCities={popularCities}
            onSelectCity={handleSelectCity}
            onDetectLocation={handleDetectLocation}
            isDetecting={isDetecting}
            inputRef={inputRef}
            fullSize
          />
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}

// Dropdown component
function LocationDropdown({
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearching,
  popularCities,
  onSelectCity,
  onDetectLocation,
  isDetecting,
  inputRef,
  fullSize = false,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: City[];
  isSearching: boolean;
  popularCities: City[];
  onSelectCity: (city: City) => void;
  onDetectLocation: () => void;
  isDetecting: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  fullSize?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`absolute z-50 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden ${
        fullSize ? "left-0 right-0" : "right-0 w-72"
      }`}
    >
      {/* Search Input */}
      <div className="p-3 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {/* Detect Location Button */}
      <button
        onClick={onDetectLocation}
        disabled={isDetecting}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100"
      >
        {isDetecting ? (
          <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
        ) : (
          <Navigation className="w-5 h-5 text-emerald-600" />
        )}
        <span className="text-sm font-medium text-slate-700">
          {isDetecting ? "Detecting..." : "Use my location"}
        </span>
      </button>

      {/* Search Results or Popular Cities */}
      <div className="max-h-64 overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <p className="px-4 py-2 text-xs font-medium text-slate-400 uppercase">Results</p>
            {searchResults.map((city) => (
              <CityOption key={city.id} city={city} onSelect={onSelectCity} />
            ))}
          </>
        ) : searchQuery.length >= 2 ? (
          <p className="px-4 py-8 text-sm text-slate-400 text-center">No cities found</p>
        ) : (
          <>
            <p className="px-4 py-2 text-xs font-medium text-slate-400 uppercase flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Popular Cities
            </p>
            {popularCities.slice(0, 8).map((city) => (
              <CityOption key={city.id} city={city} onSelect={onSelectCity} />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

// City option component
function CityOption({ city, onSelect }: { city: City; onSelect: (city: City) => void }) {
  return (
    <button
      onClick={() => onSelect(city)}
      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
    >
      <span className="text-lg">{getFlagEmoji(city.countryCode)}</span>
      <div className="text-left flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700 truncate">{city.name}</p>
        <p className="text-xs text-slate-400">{city.country}</p>
      </div>
    </button>
  );
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode === "XX") return "📍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
