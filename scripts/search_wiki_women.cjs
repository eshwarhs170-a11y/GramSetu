const https = require('https');

function searchWikimedia(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&format=json`;
    https.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (contact@gramsetu.org)'
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          if (!json.query || !json.query.search) return resolve([]);
          const titles = json.query.search.map(s => s.title).join('|');
          if (!titles) return resolve([]);
          
          const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url|size&format=json`;
          https.get(infoUrl, {
            headers: { 'User-Agent': 'GramSetuBot/1.0 (contact@gramsetu.org)' }
          }, res2 => {
            let data2 = '';
            res2.on('data', c => data2 += c);
            res2.on('end', () => {
              try {
                const json2 = JSON.parse(data2);
                const pages = Object.values(json2.query ? json2.query.pages : {});
                const results = pages.map(p => ({
                  title: p.title,
                  url: p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].url : null
                })).filter(r => r.url && (r.url.endsWith('.jpg') || r.url.endsWith('.jpeg') || r.url.endsWith('.png') || r.url.endsWith('.JPG')));
                resolve(results);
              } catch (e) { resolve([]); }
            });
          });
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  console.log('--- Gruha Lakshmi Candidates ---');
  const gl = await searchWikimedia('Karnataka woman');
  console.log(gl);

  console.log('--- Stree Shakti Candidates ---');
  const shg = await searchWikimedia('Self help group India');
  console.log(shg);
}

main();
