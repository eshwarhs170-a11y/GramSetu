const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function fetchPage(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000,
      rejectUnauthorized: false
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /<img[^>]+src=["']([^"']+)["']/gi;
        const matches = [];
        let m;
        while ((m = regex.exec(data)) !== null) {
          matches.push(m[1]);
        }
        resolve({ url, status: res.statusCode, imgs: matches, html: data });
      });
    });
    req.on('error', (e) => resolve({ url, error: e.message, imgs: [] }));
    req.on('timeout', () => { req.destroy(); resolve({ url, timeout: true, imgs: [] }); });
  });
}

async function inspect() {
  console.log('--- Inspecting raitamitra slider images ---');
  const rm = await fetchPage('https://raitamitra.karnataka.gov.in/');
  const rmImgs = rm.imgs.filter(i => i.includes('/slids/') || i.includes('uploads') || i.includes('banner'));
  console.log('Raitamitra images:', rmImgs);

  console.log('--- Inspecting pmkusum ---');
  const kusum = await fetchPage('https://pmkusum.mnre.gov.in/');
  console.log('PM Kusum images:', kusum.imgs);

  console.log('--- Inspecting soilhealth ---');
  const soil = await fetchPage('https://soilhealth.dac.gov.in/');
  console.log('Soil health images:', soil.imgs);

  console.log('--- Inspecting agriinfra ---');
  const aif = await fetchPage('https://agriinfra.dac.gov.in/');
  console.log('AIF images:', aif.imgs.filter(i => !i.includes('.svg')));

  console.log('--- Inspecting pmfby ---');
  const pmfby = await fetchPage('https://pmfby.gov.in/');
  console.log('PMFBY images:', pmfby.imgs);
}

inspect();
