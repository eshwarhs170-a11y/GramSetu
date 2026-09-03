const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'schemes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function fetchPage(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
      },
      timeout: 10000,
      rejectUnauthorized: false
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`[${res.statusCode}] ${url}`);
        const regex = /<img[^>]+src=["']([^"']+)["']/gi;
        const matches = [];
        let m;
        while ((m = regex.exec(data)) !== null) {
          matches.push(m[1]);
        }
        resolve({ url, status: res.statusCode, imgs: matches, html: data });
      });
    });
    req.on('error', (e) => {
      console.log(`[ERR] ${url} -> ${e.message}`);
      resolve({ url, error: e.message, imgs: [] });
    });
    req.on('timeout', () => {
      req.destroy();
      console.log(`[TIMEOUT] ${url}`);
      resolve({ url, timeout: true, imgs: [] });
    });
  });
}

async function run() {
  const sites = [
    'https://pmkisan.gov.in/',
    'https://pmfby.gov.in/',
    'https://agriinfra.dac.gov.in/',
    'https://soilhealth.dac.gov.in/',
    'https://pmkusum.mnre.gov.in/',
    'https://agrimachinery.nic.in/',
    'https://sfacindia.com/',
    'https://www.indiacoffee.org/',
    'https://samrakshane.karnataka.gov.in/',
    'https://raitamitra.karnataka.gov.in/'
  ];

  for (const s of sites) {
    const res = await fetchPage(s);
    if (res.imgs && res.imgs.length > 0) {
      console.log(`-> ${s} has ${res.imgs.length} images:`);
      console.log(res.imgs.slice(0, 8));
    }
  }
}

run();
