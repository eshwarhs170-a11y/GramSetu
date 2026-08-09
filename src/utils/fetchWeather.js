const districtToCityMap = {
  'Dakshina Kannada': 'Mangaluru',
  'Uttara Kannada': 'Karwar',
  'Bengaluru Urban': 'Bengaluru',
  'Bengaluru Rural': 'Doddaballapura',
  'Chamarajanagar': 'Chamarajanagar',
  'Vijayanagara': 'Hospet',
}

export async function fetchWeatherForLocation(talukName, districtName) {
  try {
    let geoRes;
    let geoData;
    let usedLocationName = talukName || districtName;
    
    // 1. Try Taluk first (most precise)
    if (talukName) {
      geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(talukName)}&count=1&language=en&format=json`);
      geoData = await geoRes.json();
    }

    // 2. If Taluk fails, try District mapped name
    if (!geoData?.results || geoData.results.length === 0) {
      let searchQuery = districtToCityMap[districtName] || districtName;
      usedLocationName = districtName;
      geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`);
      geoData = await geoRes.json();

      // 3. Try District + Karnataka
      if (!geoData?.results || geoData.results.length === 0) {
        geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery + " Karnataka")}&count=1&language=en&format=json`);
        geoData = await geoRes.json();
      }
    }

    // 4. Ultimate fallback to Bengaluru
    if (!geoData?.results || geoData.results.length === 0) {
      usedLocationName = "Bengaluru";
      geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=Bengaluru&count=1&language=en&format=json`);
      geoData = await geoRes.json();
    }

    const { latitude, longitude } = geoData.results[0];

    // Fetch weather forecast using coordinates
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
    const weatherData = await weatherRes.json();
    
    // Attach the resolved location name so UI knows what we actually found
    weatherData.resolvedLocation = usedLocationName;

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

// Map WMO weather codes to our simple conditions and lucide-react icons
export function getWeatherCondition(wmoCode) {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  
  if (wmoCode === 0) return { condition: 'Sunny', type: 'sunny' };
  if (wmoCode === 1 || wmoCode === 2 || wmoCode === 3) return { condition: 'Cloudy', type: 'cloudy' };
  if (wmoCode >= 45 && wmoCode <= 48) return { condition: 'Fog', type: 'cloudy' };
  if (wmoCode >= 51 && wmoCode <= 67) return { condition: 'Rain', type: 'rain' };
  if (wmoCode >= 71 && wmoCode <= 77) return { condition: 'Snow', type: 'snow' };
  if (wmoCode >= 80 && wmoCode <= 82) return { condition: 'Rain', type: 'rain' };
  if (wmoCode >= 85 && wmoCode <= 86) return { condition: 'Snow', type: 'snow' };
  if (wmoCode >= 95 && wmoCode <= 99) return { condition: 'Thunderstorm', type: 'rain' };
  
  return { condition: 'Unknown', type: 'cloudy' };
}

export function formatForecastData(weatherData) {
  if (!weatherData || !weatherData.daily) return [];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const formatted = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(weatherData.daily.time[i]);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[date.getDay()];
    
    const maxTemp = Math.round(weatherData.daily.temperature_2m_max[i]);
    const minTemp = Math.round(weatherData.daily.temperature_2m_min[i]);
    const precipProb = weatherData.daily.precipitation_probability_max[i] || 0;
    
    const weatherCode = weatherData.daily.weather_code[i];
    const { condition, type } = getWeatherCondition(weatherCode);

    formatted.push({
      day: dayName,
      temp: `${maxTemp}°`,
      high: `${maxTemp}°`,
      low: `${minTemp}°`,
      condition: condition,
      type: type, // 'sunny', 'cloudy', 'rain', etc. for icon mapping in component
      rain: `${precipProb}%`
    });
  }

  return formatted;
}
