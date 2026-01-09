// Weather Service using Open-Meteo API (free, no API key required)

export interface City {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  population?: number;
}

export interface WeatherForecast {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitationSum: number;
  precipitationProbability: number;
}

export interface WeatherData {
  city: City;
  currentTemp: number;
  forecast: WeatherForecast[];
  weeklyPrecipitationForecast: number; // mm total for next 7 days
  weeklyAvgHighTemp: number; // avg max temp for next 7 days
}

export interface ClimateAverages {
  city: City;
  avgWeeklyPrecipitation: number; // mm (historical average for this week)
  avgDailyHighTemp: number; // °C (historical average)
  month: number;
}

// Search cities by name
export async function searchCities(query: string): Promise<City[]> {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
    );
    
    if (!response.ok) throw new Error("Failed to search cities");
    
    const data = await response.json();
    
    if (!data.results) return [];
    
    return data.results.map((r: any) => ({
      id: r.id,
      name: r.name,
      country: r.country,
      countryCode: r.country_code,
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone,
      population: r.population,
    }));
  } catch (error) {
    console.error("City search error:", error);
    return [];
  }
}

// Get city from coordinates (reverse geocoding)
export async function getCityFromCoords(lat: number, lon: number): Promise<City | null> {
  try {
    // Open-Meteo doesn't have reverse geocoding, so we use a nearby city search
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=city&count=1&language=en&format=json`
    );
    
    // Fallback: Create a generic city object from coordinates
    // In production, you'd use a proper reverse geocoding service
    return {
      id: Math.floor(lat * 1000 + lon),
      name: "Your Location",
      country: "Detected",
      countryCode: "XX",
      latitude: lat,
      longitude: lon,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
}

// Get weather forecast for a location
export async function getWeatherForecast(city: City): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${city.latitude}&longitude=${city.longitude}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max` +
      `&current=temperature_2m` +
      `&timezone=${encodeURIComponent(city.timezone || "auto")}` +
      `&forecast_days=7`
    );
    
    if (!response.ok) throw new Error("Failed to fetch weather");
    
    const data = await response.json();
    
    const forecast: WeatherForecast[] = data.daily.time.map((date: string, i: number) => ({
      date,
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      precipitationSum: data.daily.precipitation_sum[i],
      precipitationProbability: data.daily.precipitation_probability_max[i],
    }));
    
    // Calculate weekly totals
    const weeklyPrecipitationForecast = forecast.reduce((sum, day) => sum + day.precipitationSum, 0);
    const weeklyAvgHighTemp = forecast.reduce((sum, day) => sum + day.temperatureMax, 0) / forecast.length;
    
    return {
      city,
      currentTemp: data.current.temperature_2m,
      forecast,
      weeklyPrecipitationForecast,
      weeklyAvgHighTemp,
    };
  } catch (error) {
    console.error("Weather fetch error:", error);
    throw error;
  }
}

// Get historical climate averages
// Note: Open-Meteo climate API requires specific date ranges
export async function getClimateAverages(city: City): Promise<ClimateAverages> {
  try {
    // Get current month to fetch relevant historical data
    const now = new Date();
    const month = now.getMonth() + 1;
    
    // Use historical weather API for past years average
    const currentYear = now.getFullYear();
    const startYear = currentYear - 10;
    
    // Fetch historical data for this week across past 10 years
    const startDate = `${startYear}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${currentYear - 1}-${String(month).padStart(2, "0")}-28`;
    
    const response = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?` +
      `latitude=${city.latitude}&longitude=${city.longitude}` +
      `&start_date=${startDate}&end_date=${endDate}` +
      `&daily=temperature_2m_max,precipitation_sum` +
      `&timezone=${encodeURIComponent(city.timezone || "auto")}`
    );
    
    if (!response.ok) {
      // Fallback to estimated averages if historical API fails
      return getEstimatedAverages(city, month);
    }
    
    const data = await response.json();
    
    // Calculate averages from historical data
    const temps = data.daily.temperature_2m_max.filter((t: number | null) => t !== null);
    const precips = data.daily.precipitation_sum.filter((p: number | null) => p !== null);
    
    const avgDailyHighTemp = temps.length > 0 
      ? temps.reduce((a: number, b: number) => a + b, 0) / temps.length 
      : 25;
    
    const avgDailyPrecip = precips.length > 0
      ? precips.reduce((a: number, b: number) => a + b, 0) / precips.length
      : 3;
    
    return {
      city,
      avgWeeklyPrecipitation: avgDailyPrecip * 7, // Weekly average
      avgDailyHighTemp,
      month,
    };
  } catch (error) {
    console.error("Climate data error:", error);
    return getEstimatedAverages(city, new Date().getMonth() + 1);
  }
}

// Fallback estimated averages based on latitude and month
function getEstimatedAverages(city: City, month: number): ClimateAverages {
  const lat = Math.abs(city.latitude);
  
  // Rough estimates based on latitude and season
  let baseTemp = 25;
  let basePrecip = 20;
  
  // Adjust for latitude (tropical vs temperate)
  if (lat < 23.5) {
    // Tropical
    baseTemp = 28;
    basePrecip = 25;
  } else if (lat < 45) {
    // Temperate
    baseTemp = 20;
    basePrecip = 15;
  } else {
    // Cold regions
    baseTemp = 12;
    basePrecip = 12;
  }
  
  // Adjust for season (Northern Hemisphere bias)
  const isSummer = (city.latitude > 0 && month >= 5 && month <= 9) ||
                   (city.latitude < 0 && (month >= 11 || month <= 3));
  
  if (isSummer) {
    baseTemp += 5;
    basePrecip += 10;
  } else {
    baseTemp -= 5;
  }
  
  return {
    city,
    avgWeeklyPrecipitation: basePrecip,
    avgDailyHighTemp: baseTemp,
    month,
  };
}

// Popular cities for quick selection
export const POPULAR_CITIES: City[] = [
  { id: 3448439, name: "São Paulo", country: "Brazil", countryCode: "BR", latitude: -23.5475, longitude: -46.6361, timezone: "America/Sao_Paulo", population: 12300000 },
  { id: 1277333, name: "Mumbai", country: "India", countryCode: "IN", latitude: 19.0728, longitude: 72.8826, timezone: "Asia/Kolkata", population: 12500000 },
  { id: 1816670, name: "Beijing", country: "China", countryCode: "CN", latitude: 39.9075, longitude: 116.3972, timezone: "Asia/Shanghai", population: 11700000 },
  { id: 2332459, name: "Lagos", country: "Nigeria", countryCode: "NG", latitude: 6.4541, longitude: 3.3947, timezone: "Africa/Lagos", population: 14400000 },
  { id: 1642911, name: "Jakarta", country: "Indonesia", countryCode: "ID", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta", population: 10560000 },
  { id: 5128581, name: "New York", country: "United States", countryCode: "US", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York", population: 8336000 },
  { id: 2643743, name: "London", country: "United Kingdom", countryCode: "GB", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", population: 8982000 },
  { id: 1701668, name: "Manila", country: "Philippines", countryCode: "PH", latitude: 14.5995, longitude: 120.9842, timezone: "Asia/Manila", population: 1780000 },
  { id: 3451190, name: "Rio de Janeiro", country: "Brazil", countryCode: "BR", latitude: -22.9068, longitude: -43.1729, timezone: "America/Sao_Paulo", population: 6748000 },
  { id: 1275339, name: "Kolkata", country: "India", countryCode: "IN", latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata", population: 4500000 },
  { id: 3936456, name: "Lima", country: "Peru", countryCode: "PE", latitude: -12.0464, longitude: -77.0428, timezone: "America/Lima", population: 10700000 },
  { id: 360630, name: "Cairo", country: "Egypt", countryCode: "EG", latitude: 30.0444, longitude: 31.2357, timezone: "Africa/Cairo", population: 10200000 },
];
