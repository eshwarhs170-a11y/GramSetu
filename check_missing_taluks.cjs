const { districtsOfKarnataka } = require('./src/data/karnatakaTaluks.js'); // Cannot directly require if it uses export default
// I will just read the files and parse them using regex.
const fs = require('fs');
const taluksContent = fs.readFileSync('./src/data/karnatakaTaluks.js', 'utf-8');
const gpsContent = fs.readFileSync('./src/data/talukToGps.js', 'utf-8');

const districtRegex = /name:\s*"([^"]+)"\s*,\s*taluks:\s*\[([\s\S]*?)\]/g;
let match;
let missing = [];

while ((match = districtRegex.exec(taluksContent)) !== null) {
  const district = match[1];
  const taluksStr = match[2];
  const talukRegex = /name:\s*"([^"]+)"/g;
  let tMatch;
  while ((tMatch = talukRegex.exec(taluksStr)) !== null) {
    const taluk = tMatch[1];
    const key = `"${district}|${taluk}"`;
    if (!gpsContent.includes(key)) {
      missing.push(`${district} -> ${taluk}`);
    }
  }
}

console.log("Total missing taluks in talukToGps.js:", missing.length);
if (missing.length > 0) {
  console.log(missing.join("\n"));
}
