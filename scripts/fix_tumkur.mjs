import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/data/talukToGps.js',
  'src/data/hobliToGps.js',
  'src/data/karnatakaUrbanData.js',
  'src/data/karnatakVillages.js',
];

for (const f of files) {
  let content = readFileSync(f, 'utf8');
  const replaced = content.replace(/"Tumakuru\|/g, '"Tumkuru|');
  if (replaced !== content) {
    writeFileSync(f, replaced);
    console.log('Fixed:', f);
  } else {
    console.log('No change needed:', f);
  }
}
