const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'schemes');

function downloadFile(url, destFilename) {
  return new Promise((resolve) => {
    const dest = path.join(publicDir, destFilename);
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 15000,
      rejectUnauthorized: false
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destFilename).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`[FAIL ${res.statusCode}] ${url}`);
        resolve(false);
        return;
      }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => {
        ws.close(() => {
          const stats = fs.statSync(dest);
          if (stats.size < 1000) {
            console.log(`[TOO SMALL ${stats.size}b] ${destFilename}`);
            fs.unlinkSync(dest);
            resolve(false);
          } else {
            console.log(`[SUCCESS ${(stats.size/1024).toFixed(1)} KB] ${destFilename} from ${url}`);
            resolve(true);
          }
        });
      });
      ws.on('error', (err) => {
        console.log(`[ERR write] ${destFilename}: ${err.message}`);
        resolve(false);
      });
    });
    req.on('error', (e) => {
      console.log(`[ERR req] ${url}: ${e.message}`);
      resolve(false);
    });
  });
}

async function run() {
  await downloadFile('https://krishimapper.dac.gov.in/static/media/Slider-2.e786b2299da26d9458a1.jpg', 'soil-health-card.jpg');
  await downloadFile('https://static.pib.gov.in/WriteReadData/userfiles/image/image005GIMF.jpg', 'soil-health-card-pib.jpg');
  await downloadFile('https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG', 'coffee-dev.jpg');
  await downloadFile('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', 'coffee-plantation.jpg');
  await downloadFile('https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80', 'varuna-mitra.jpg');
}

run();
