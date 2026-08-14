/**
 * fetchVillageInfoData.cjs
 *
 * Scrapes villageinfo.in to build complete Karnataka:
 *   District → Taluk → Gram Panchayat → Village
 *
 * Usage:
 *   node fetchVillageInfoData.cjs
 *
 * Generates:
 *   src/data/karnatakaTaluks.js
 *   src/data/talukToGps.js
 *   src/data/karnatakVillages.js
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ─── villageinfo.in URL map ────────────────────────────────────────────────────
// District URL slug → actual district name in our app
const DISTRICT_SLUGS = [
  ['bagalkote',         'Bagalkot'],
  ['ballari',           'Ballari'],
  ['belagavi',          'Belagavi'],
  ['bengaluru-rural',   'Bengaluru Rural'],
  ['bengaluru-urban',   'Bengaluru Urban'],
  ['bidar',             'Bidar'],
  ['chamarajanagar',    'Chamarajanagar'],
  ['chikkaballapura',   'Chikkaballapur'],
  ['chikkamagaluru',    'Chikkamagaluru'],
  ['chitradurga',       'Chitradurga'],
  ['dakshina-kannada',  'Dakshina Kannada'],
  ['davanagere',        'Davanagere'],
  ['dharwad',           'Dharwad'],
  ['gadag',             'Gadag'],
  ['hassan',            'Hassan'],
  ['haveri',            'Haveri'],
  ['kalaburagi',        'Kalaburagi'],
  ['kodagu',            'Kodagu'],
  ['kolar',             'Kolar'],
  ['koppal',            'Koppal'],
  ['mandya',            'Mandya'],
  ['mysuru',            'Mysuru'],
  ['raichur',           'Raichur'],
  ['shivamogga',        'Shivamogga'],
  ['tumakuru',          'Tumakuru'],
  ['udupi',             'Udupi'],
  ['uttara-kannada',    'Uttara Kannada'],
  ['vijayanagara',      'Vijayanagara'],
  ['vijayapura',        'Vijayapura'],
  ['yadgir',            'Yadgir'],
];

// ─── Fetch helpers ────────────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchHtml(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 20000,
    }, (res) => {
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

// ─── HTML Parsers ─────────────────────────────────────────────────────────────
// Extract taluk links from district page
function parseTalukLinks(html, districtSlug) {
  const taluks = [];
  // Match links like /karnataka/tumakuru/gubbi/
  const re = new RegExp(`href="/karnataka/${districtSlug}/([a-z0-9-]+)/"`, 'g');
  let m;
  const seen = new Set();
  while ((m = re.exec(html)) !== null) {
    const slug = m[1];
    if (!seen.has(slug) && slug !== 'block') {
      seen.add(slug);
      taluks.push(slug);
    }
  }
  return taluks;
}

// Extract village rows from taluk page: [{name, gramPanchayat}]
function parseVillages(html) {
  const villages = [];
  const rowRe = /<tr><td>\d+<\/td><td><a [^>]+>([^<]+)<\/a><\/td><td>(Rural|Urban|Both)<\/td><td>([^<]+)<\/td><\/tr>/g;
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const name = m[1].trim();
    const gp   = m[3].replace(/<[^>]+>/g, '').trim();
    if (name && gp && gp !== 'Not applicable') {
      villages.push({ name, gp });
    }
  }
  return villages;
}

function titleFromSlug(slug) {
  let title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  if (title.endsWith(' Block')) {
    title = title.substring(0, title.length - 6);
  }
  return title;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌾 GramSetu — Karnataka Village Data Scraper (Taluk -> GP -> Village)');
  console.log('   Source: villageinfo.in (Census 2011 data)');
  console.log('═'.repeat(55));

  const talukToGpsData = {}; // key: "District|Taluk" → string[] (List of GPs)
  const gpToVillagesData = {}; // key: "District|Taluk|GP" → string[]
  const talukMap   = {}; // District → [{name}]

  for (const [distSlug, distName] of DISTRICT_SLUGS) {
    console.log(`\n📍 District: ${distName}`);
    talukMap[distName] = [];

    const distUrl  = `https://villageinfo.in/karnataka/${distSlug}/`;
    const distHtml = await fetchHtml(distUrl);
    await sleep(300);

    const talukSlugs = parseTalukLinks(distHtml, distSlug);
    console.log(`   Found ${talukSlugs.length} taluks`);

    for (const talukSlug of talukSlugs) {
      const talukName   = titleFromSlug(talukSlug);
      const talukUrl    = `https://villageinfo.in/karnataka/${distSlug}/${talukSlug}/`;
      const talukHtml   = await fetchHtml(talukUrl);
      await sleep(400);

      const villages = parseVillages(talukHtml);
      
      const talukEntry = { name: talukName };
      talukMap[distName].push(talukEntry);

      const talukKey = `${distName}|${talukName}`;
      
      // Find unique GPs in this taluk
      const uniqueGps = [...new Set(villages.map(v => v.gp))].sort();
      talukToGpsData[talukKey] = uniqueGps;

      for (const gpName of uniqueGps) {
        const gpKey = `${talukKey}|${gpName}`;
        gpToVillagesData[gpKey] = villages
           .filter(v => v.gp === gpName)
           .map(v => v.name)
           .sort();
      }

      process.stdout.write(`   ↳ ${talukName}: ${uniqueGps.length} GPs, ${villages.length} villages\n`);
    }
  }

  // ── Generate karnatakaTaluks.js ──────────────────────────────────────────
  const dataDir = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  let taluksJs = `// AUTO-GENERATED by fetchVillageInfoData.cjs\n// Source: villageinfo.in (Census 2011)\n// Generated: ${new Date().toISOString()}\n\nexport const districtsOfKarnataka = [\n`;

  for (const [distName, taluks] of Object.entries(talukMap)) {
    if (!taluks.length) continue;
    taluksJs += `  {\n    name: ${JSON.stringify(distName)},\n    taluks: [\n`;
    for (const { name } of taluks) {
      taluksJs += `      { name: ${JSON.stringify(name)} },\n`;
    }
    taluksJs += `    ]\n  },\n`;
  }
  taluksJs += `];\n`;

  fs.writeFileSync(path.join(dataDir, 'karnatakaTaluks.js'), taluksJs, 'utf8');
  console.log('\n💾 karnatakaTaluks.js written');

  // ── Generate talukToGps.js ───────────────────────────────────────────────
  let talukToGpsJs = `// AUTO-GENERATED by fetchVillageInfoData.cjs\n// Key: "District|Taluk" → string[] (List of Gram Panchayats)\n// Generated: ${new Date().toISOString()}\n\nconst talukToGps = {\n`;
  for (const [key, vals] of Object.entries(talukToGpsData)) {
    if (!vals.length) continue;
    const arr = vals.map(v => JSON.stringify(v)).join(', ');
    talukToGpsJs += `  ${JSON.stringify(key)}: [${arr}],\n`;
  }
  talukToGpsJs += `};\n\nexport default talukToGps;\n`;

  fs.writeFileSync(path.join(dataDir, 'talukToGps.js'), talukToGpsJs, 'utf8');
  console.log('💾 talukToGps.js written');

  // ── Generate karnatakVillages.js ─────────────────────────────────────────
  let villagesJs = `// AUTO-GENERATED by fetchVillageInfoData.cjs\n// Source: villageinfo.in (Census 2011)\n// Key: "District|Taluk|GramPanchayat" → string[]\n// Generated: ${new Date().toISOString()}\n\nconst villages = {\n`;

  for (const [key, vals] of Object.entries(gpToVillagesData)) {
    if (!vals.length) continue;
    const arr = vals.map(v => JSON.stringify(v)).join(', ');
    villagesJs += `  ${JSON.stringify(key)}: [${arr}],\n`;
  }
  villagesJs += `};\n\nexport default villages;\n`;

  fs.writeFileSync(path.join(dataDir, 'karnatakVillages.js'), villagesJs, 'utf8');
  console.log('💾 karnatakVillages.js written');

  const totalVillages = Object.values(gpToVillagesData).reduce((s, a) => s + a.length, 0);
  const totalGps      = Object.keys(gpToVillagesData).length;
  console.log(`\n✅ Done! ${Object.keys(talukMap).length} districts | ${totalGps} Gram Panchayats | ${totalVillages} villages\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
