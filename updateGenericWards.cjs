const fs = require('fs');
let fileStr = fs.readFileSync('src/data/karnatakaUrbanData.js', 'utf8');

const targets = [
  { key: '"Ballari|Ballari"', count: 39 },
  { key: '"Vijayapura|Vijayapura"', count: 35 },
  { key: '"Raichur|Raichur"', count: 35 },
  { key: '"Tumakuru|Tumakuru"', count: 35 },
  { key: '"Davanagere|Davanagere"', count: 45 },
  { key: '"Hassan|Hassan"', count: 35 },
  { key: '"Mandya|Mandya"', count: 35 },
  { key: '"Kolar|Kolar"', count: 35 },
  { key: '"Bidar|Bidar"', count: 35 },
  { key: '"Gadag|Gadag-Betageri"', count: 35 },
  { key: '"Bagalkot|Bagalkot"', count: 35 },
  { key: '"Chikkaballapur|Chikkaballapur"', count: 31 },
  { key: '"Raichur|Sindhnur"', count: 35 },
  { key: '"Belagavi|Belagavi"', count: 58 },
  { key: '"Mysuru|Mysuru"', count: 65 },
  { key: '"Dharwad|Hubballi"', count: 82 },
  { key: '"Dharwad|Dharwad"', count: 82 }, // Hubli-Dharwad has 82 wards combined
  { key: '"Dakshina Kannada|Mangaluru"', count: 60 }
];

// Let's only update the ones we know have generic names based on our grep (Gandhi Nagar)
// Actually we will just overwrite the ones that currently have generic names or are listed in the implementation plan.
const planTargets = [
  { key: '"Ballari|Ballari"', count: 39 },
  { key: '"Vijayapura|Vijayapura"', count: 35 },
  { key: '"Raichur|Raichur"', count: 35 },
  { key: '"Tumakuru|Tumakuru"', count: 35 },
  { key: '"Davanagere|Davanagere"', count: 45 },
  { key: '"Hassan|Hassan"', count: 35 },
  { key: '"Mandya|Mandya"', count: 35 },
  { key: '"Kolar|Kolar"', count: 35 },
  { key: '"Bidar|Bidar"', count: 35 },
  { key: '"Gadag|Gadag-Betageri"', count: 35 },
  { key: '"Bagalkot|Bagalkot"', count: 35 },
  { key: '"Chikkaballapur|Chikkaballapur"', count: 31 },
  { key: '"Raichur|Sindhnur"', count: 35 },
];

for (let target of planTargets) {
  const { key, count } = target;
  
  // Find the block starting from key to the closing bracket of the wards array
  const keyIndex = fileStr.indexOf(key);
  if (keyIndex === -1) {
    console.warn('Could not find key:', key);
    continue;
  }
  
  const wardsStart = fileStr.indexOf('wards: [', keyIndex);
  const wardsEnd = fileStr.indexOf(']', wardsStart);
  
  if (wardsStart !== -1 && wardsEnd !== -1) {
    const arr = [];
    for (let i = 1; i <= count; i++) {
       arr.push(`"Ward ${i}"`);
    }
    const newWardsStr = 'wards: [\n      ' + arr.join(', ') + '\n    ';
    
    fileStr = fileStr.substring(0, wardsStart) + newWardsStr + fileStr.substring(wardsEnd);
    console.log('Updated:', key);
  }
}

fs.writeFileSync('src/data/karnatakaUrbanData.js', fileStr);
console.log('Update complete.');
