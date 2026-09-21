import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/components/VillagerScreens.jsx', 'utf8');

// Replace tumkur/tumakuru in canonicalDistrict to map to tumkuru
// The file may have CRLF endings - use a regex
c = c.replace(/'tumkur': 'tumakuru',(\r?\n)\s*'tumakuru': 'tumakuru',/, 
              `'tumkur': 'tumkuru',$1      'tumakuru': 'tumkuru',$1      'tumkuru': 'tumkuru',`);

writeFileSync('src/components/VillagerScreens.jsx', c);
console.log('Done!');

// Verify
const lines = c.split('\n').slice(3720, 3732);
lines.forEach((l, i) => console.log(3721+i, l.trim()));
