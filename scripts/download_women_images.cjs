const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const candidates = [
  { name: 'gruha-lakshmi-wcd.jpg', url: 'https://dwcd.karnataka.gov.in/uploads/media_to_upload1757921164.jpg' },
  { name: 'gruha-lakshmi-empower.jpg', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80' },
  { name: 'gruha-lakshmi-rural.jpg', url: 'https://images.unsplash.com/photo-1617450365226-9bf28c04e130?w=800&q=80' },
  { name: 'stree-shakti-shg.jpg', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80' },
  { name: 'stree-shakti-group.jpg', url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80' },
  { name: 'stree-shakti-handicraft.jpg', url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80' }
];

async function dl(item) {
  return new Promise(resolve => {
    const file = path.join(__dirname, '..', 'public', 'schemes', item.name);
    const mod = item.url.startsWith('https') ? https : http;
    mod.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, res => {
      if (res.statusCode === 200) {
        const ws = fs.createWriteStream(file);
        res.pipe(ws);
        ws.on('finish', () => {
          ws.close(() => {
            const sz = fs.statSync(file).size;
            console.log(`Saved ${item.name}: ${(sz/1024).toFixed(1)} KB`);
            resolve(true);
          });
        });
      } else {
        console.log(`Failed ${item.name}: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', e => {
      console.log(`Err ${item.name}:`, e.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const c of candidates) {
    await dl(c);
  }
}

run();
