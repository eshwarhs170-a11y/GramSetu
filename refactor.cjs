const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/VillagerScreens.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add import
if (!content.includes("import { kaSchemes } from '../data/schemesData'")) {
  content = content.replace(
    "import { fetchWeatherForLocation, formatForecastData } from '../utils/fetchWeather'",
    "import { fetchWeatherForLocation, formatForecastData } from '../utils/fetchWeather'\nimport { kaSchemes } from '../data/schemesData'"
  );
}

// 2. Remove the old kaSchemes export
const startString = "export const kaSchemes = [";
const startIndex = content.indexOf(startString);

if (startIndex !== -1) {
  // Find the closing bracket of the array
  // We know it ends right before `export const kaPrices = [`
  const endIndex = content.indexOf('export const kaPrices = [');
  if (endIndex !== -1) {
    const stringToRemove = content.substring(startIndex, endIndex);
    content = content.replace(stringToRemove, '// kaSchemes is now imported from src/data/schemesData.js\n\n');
  }
}

// 3. Update Apply Now logic
const oldApplyLogic = `let link = 'https://sevasindhu.karnataka.gov.in/';
                  if (selectedScheme.id === 'bhoomi-rtc') link = 'https://landrecords.karnataka.gov.in/';
                  else if (selectedScheme.id === 'pm-kisan') link = 'https://pmkisan.gov.in/';
                  else if (selectedScheme.id === 'gruha-lakshmi') link = 'https://sevasindhu.karnataka.gov.in/';
                  else if (selectedScheme.id === 'ayushman-arogya') link = 'https://arogya.karnataka.gov.in/';
                  else if (selectedScheme.id === 'raitha-siri') link = 'https://raitamitra.karnataka.gov.in/';
                  else if (selectedScheme.id === 'krishi-sinchai') link = 'https://pmksy.gov.in/';
                  window.open(link, '_blank');`;

const newApplyLogic = `let link = selectedScheme.applyLink || selectedScheme.source || selectedScheme.buddyUrl || 'https://sevasindhu.karnataka.gov.in/';
                  window.open(link, '_blank');`;

content = content.replace(oldApplyLogic, newApplyLogic);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully refactored VillagerScreens.jsx');
