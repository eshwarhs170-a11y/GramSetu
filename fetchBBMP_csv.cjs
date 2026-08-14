const https = require('https');
const fs = require('fs');
https.get('https://data.opencity.in/dataset/87b978d1-352e-4b90-aa2c-9991e55d3425/resource/01d485da-6509-4555-ab4c-036720ad0c51/download/3648198e-a595-4c6b-b76e-2ec180fc9f14.csv', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const lines = data.split('\n');
    const wards = [];
    for (let i = 1; i < lines.length; i++) {
       const line = lines[i].trim();
       if (!line) continue;
       const parts = line.split(',');
       const wardNo = parts[0].replace(/"/g, '');
       const wardName = parts[1].replace(/"/g, '');
       if (wardNo && wardName) {
           wards.push(`"Ward ${wardNo} - ${wardName}"`);
       }
    }
    const wardsString = wards.join(',\n      ');
    fs.writeFileSync('bbmp_wards_final.txt', wardsString);
    console.log('Saved bbmp_wards_final.txt with ' + wards.length + ' wards.');
  });
}).on('error', console.error);
