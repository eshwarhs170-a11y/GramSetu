const fs = require('fs');
const https = require('https');

const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

async function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url.startsWith('http')) return resolve(false);
    
    https.get(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      // 200, 301, 302 are okay
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function run() {
  const broken = [];
  let checked = 0;
  for (const dist in data) {
    for (const key in data[dist]) {
      let url = data[dist][key];
      // special handling for Special:FilePath
      if (url.includes('Special:FilePath')) {
         // check the actual url
      }
      const ok = await checkUrl(url);
      if (!ok) {
        broken.push(`[${dist}] ${key}: ${url}`);
      }
      checked++;
      if (checked % 10 === 0) console.log(`Checked ${checked}...`);
    }
  }
  
  console.log("Broken URLs:");
  broken.forEach(b => console.log(b));
}

run();
