const https = require('https');
const http = require('http');

function checkPage(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000,
      rejectUnauthorized: false
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        console.log(`[${res.statusCode}] ${url}`);
        const regex = /<img[^>]+src=["']([^"']+)["']/gi;
        const matches = [];
        let m;
        while ((m = regex.exec(data)) !== null) matches.push(m[1]);
        console.log('Imgs:', matches);
        resolve(matches);
      });
    });
    req.on('error', e => { console.log(url, 'ERR', e.message); resolve([]); });
    req.on('timeout', () => { req.destroy(); console.log(url, 'TIMEOUT'); resolve([]); });
  });
}

async function run() {
  await checkPage('https://sevasindhugs.karnataka.gov.in/');
  await checkPage('https://sevasindhugs.karnataka.gov.in/glakshmi/');
  await checkPage('https://dwcd.karnataka.gov.in/');
}
run();
