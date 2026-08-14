const fs = require('fs');

async function getWards() {
  const res = await fetch('https://en.wikipedia.org/wiki/List_of_BBMP_Wards');
  const html = await res.text();
  
  let wards = [];
  const regex = /<td>(\d+)<\/td>\s*<td>.*?<\/td>\s*<td>(?:<a[^>]*>)?(.*?)(?:<\/a>)?<\/td>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    let no = match[1];
    let name = match[2].replace(/<[^>]*>?/gm, '').trim();
    if (no && name && !wards.includes(`Ward ${no} - ${name}`)) {
      wards.push({ no: parseInt(no), name: name });
    }
  }
  
  if (wards.length === 0) {
     const regex2 = /<tr>\s*<td>(\d+)<\/td>\s*<td>(.*?)<\/td>/g;
     while ((match = regex2.exec(html)) !== null) {
        let no = match[1];
        let name = match[2].replace(/<[^>]*>?/gm, '').trim();
        wards.push({ no: parseInt(no), name: name });
     }
  }
  
  // Sort and remove duplicates
  wards.sort((a, b) => a.no - b.no);
  const uniqueWards = [];
  const seen = new Set();
  for (const w of wards) {
    if (!seen.has(w.no)) {
      seen.add(w.no);
      uniqueWards.push(`Ward ${w.no} - ${w.name}`);
    }
  }
  
  fs.writeFileSync('bbmp.json', JSON.stringify(uniqueWards, null, 2));
  console.log(`Saved ${uniqueWards.length} wards.`);
}

getWards().catch(console.error);
