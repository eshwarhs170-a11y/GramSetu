const https = require('https');
https.get('https://villageinfo.in/karnataka/koppal/', {headers:{'User-Agent':'Mozilla/5.0'}}, r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const slugs = new Set();
    let m;
    const re = /href="\/karnataka\/koppal\/([a-z0-9-]+)\/"/g;
    while ((m = re.exec(d)) !== null) {
      slugs.add(m[1]);
    }
    console.log(Array.from(slugs));
  });
});
