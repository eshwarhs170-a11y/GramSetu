const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const candidates = [
  {
    name: 'stree-shakti-karnataka-fields.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/A_group_of_Indian_women_farmers_Karnataka_Spice_Value_Chain_Development_2015.jpg'
  },
  {
    name: 'stree-shakti-field-work.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Soil_Health_Card_Scheme_launch_in_Suratgarh%2C_Rajasthan.jpg/800px-Soil_Health_Card_Scheme_launch_in_Suratgarh%2C_Rajasthan.jpg'
  },
  {
    name: 'stree-shakti-paddy-women.jpg',
    url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'
  }
];

function download(item) {
  return new Promise(resolve => {
    const dest = path.join(__dirname, '..', 'public', 'schemes', item.name);
    const mod = item.url.startsWith('https') ? https : http;
    mod.get(item.url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (contact@gramsetu.org) Mozilla/5.0'
      },
      rejectUnauthorized: false
    }, res => {
      if (res.statusCode === 200) {
        const ws = fs.createWriteStream(dest);
        res.pipe(ws);
        ws.on('finish', () => {
          ws.close(() => {
            const sz = fs.statSync(dest).size;
            console.log(`Saved ${item.name}: ${(sz/1024).toFixed(1)} KB`);
            resolve(true);
          });
        });
      } else {
        console.log(`Fail ${item.name}: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', e => {
      console.log(`Err ${item.name}:`, e.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const c of candidates) await download(c);
}

run();
