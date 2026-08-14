const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'en.wikipedia.org',
  path: '/wiki/List_of_Bruhat_Bengaluru_Mahanagara_Palike_wards',
  headers: {
    'User-Agent': 'GramSetuDataFetcher/1.0 (eshwar@example.com) Node.js'
  }
};

https.get(options, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    let wards = [];
    // The Wikipedia page for BBMP wards has a table with columns: Ward No., Ward Name, ...
    const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
    let trMatch;
    while ((trMatch = trRegex.exec(html)) !== null) {
      const trHtml = trMatch[1];
      const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
      let tds = [];
      let tdMatch;
      while ((tdMatch = tdRegex.exec(trHtml)) !== null) {
        tds.push(tdMatch[1].replace(/<[^>]+>/g, '').trim());
      }
      if (tds.length >= 2) {
        const wardNo = parseInt(tds[0]);
        const wardName = tds[1];
        if (!isNaN(wardNo) && wardName) {
           wards.push(`Ward ${wardNo} - ${wardName}`);
        }
      }
    }
    
    // Sort just in case
    wards.sort((a,b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));
    
    fs.writeFileSync('bbmp_wards.json', JSON.stringify(wards, null, 2));
    console.log(`Saved ${wards.length} wards`);
  });
}).on('error', console.error);
