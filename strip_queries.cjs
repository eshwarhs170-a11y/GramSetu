const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/data/cropInfo.json');
let content = fs.readFileSync(file, 'utf8');

// Strip all query parameters from Wikipedia URLs
content = content.replace(/(\.jpg|\.png|\.JPG|\.jpeg|\.PNG)\?utm[^"']+/g, '$1');

fs.writeFileSync(file, content, 'utf8');
console.log('Stripped query params from images');
