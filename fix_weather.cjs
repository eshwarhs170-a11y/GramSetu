const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/components/VillagerScreens.jsx');
let content = fs.readFileSync(file, 'utf8');

const targetStr = `              {availableTaluks.map(tName => (
                <option key={tName} value={tName} style={{ color: '#000' }}>{tName}</option>
              ))}`;

const replacementStr = `              {availableTaluks.map(tObj => (
                <option key={tObj.name} value={tObj.name} style={{ color: '#000' }}>{tObj.name}</option>
              ))}`;

// Since line endings might differ, let's just do a regex replace or just replace the inner mapping logic
content = content.replace(/availableTaluks\.map\(tName => \([\s\S]*?key={tName}[\s\S]*?value={tName}[\s\S]*?{tName}<\/option>\s*\)\)/, 
`availableTaluks.map(tObj => (
                <option key={tObj.name} value={tObj.name} style={{ color: '#000' }}>{tObj.name}</option>
              ))`);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed WeatherScreen crash');
