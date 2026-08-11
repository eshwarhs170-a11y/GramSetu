const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/utils/fetchWeather.js');
let content = fs.readFileSync(file, 'utf8');

const replacement = `
// Helper to fetch and find the best match in India/Karnataka
async function fetchGeocode(query) {
  const geoRes = await fetch(\`https://geocoding-api.open-meteo.com/v1/search?name=\${encodeURIComponent(query)}&count=10&language=en&format=json\`);
  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) return null;
  
  // Prefer Karnataka
  let bestMatch = geoData.results.find(r => r.admin1 === 'Karnataka');
  // Fallback to India
  if (!bestMatch) bestMatch = geoData.results.find(r => r.country_code === 'IN');
  // Fallback to first result
  if (!bestMatch) bestMatch = geoData.results[0];
  
  return bestMatch;
}

export async function fetchWeatherForLocation(talukName, districtName) {
  try {
    let bestMatch = null;
    let usedLocationName = talukName || districtName;
    
    // 1. Try Taluk first (most precise)
    if (talukName) {
      bestMatch = await fetchGeocode(talukName);
    }

    // 2. If Taluk fails, try District mapped name
    if (!bestMatch) {
      let searchQuery = districtToCityMap[districtName] || districtName;
      usedLocationName = districtName;
      bestMatch = await fetchGeocode(searchQuery);

      // 3. Try District + Karnataka
      if (!bestMatch) {
        bestMatch = await fetchGeocode(searchQuery + " Karnataka");
      }
    }

    // 4. Ultimate fallback to Bengaluru
    if (!bestMatch) {
      usedLocationName = "Bengaluru";
      bestMatch = await fetchGeocode("Bengaluru");
    }

    if (!bestMatch) return null;

    const { latitude, longitude } = bestMatch;
`;

content = content.replace(/export async function fetchWeatherForLocation[\s\S]*?const { latitude, longitude } = geoData\.results\[0\];/, replacement.trim());

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed geocoding logic in fetchWeather.js');
