const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const dest = path.join(__dirname, '..', 'public', 'schemes', 'stree-shakti.jpg');

function download(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (contact@gramsetu.org) Mozilla/5.0'
      },
      timeout: 15000,
      rejectUnauthorized: false
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log('Status code:', res.statusCode);
        return resolve(false);
      }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => {
        ws.close(() => {
          const sz = fs.statSync(dest).size;
          console.log(`Successfully downloaded stree-shakti.jpg (${(sz/1024).toFixed(1)} KB) from ${url}`);
          resolve(true);
        });
      });
    });
    req.on('error', (e) => {
      console.log('Error:', e.message);
      resolve(false);
    });
  });
}

async function run() {
  // Real Karnataka Mysore village women photo
  const wikiUrl = 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Village_Women_at_a_Crossroads_-_Near_Mysore_-_India.JPG';
  const success = await download(wikiUrl);
  if (!success) {
    const fallback = 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80';
    await download(fallback);
  }
}

run();
