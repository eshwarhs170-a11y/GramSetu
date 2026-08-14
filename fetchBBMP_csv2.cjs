const https = require('https');
const fs = require('fs');

const urls = [
  "https://data.opencity.in/dataset/87b978d1-352e-4b90-aa2c-9991e55d3425/resource/01d485da-6509-4555-ab4c-036720ad0c51/download/3648198e-a595-4c6b-b76e-2ec180fc9f14.csv",
  "https://data.opencity.in/dataset/87b978d1-352e-4b90-aa2c-9991e55d3425/resource/fa2ea7c0-3345-44c4-8855-b213b45a11db/download/0b58bd23-4e2d-4063-9a7e-7285718e6a60.csv",
  "https://data.opencity.in/dataset/87b978d1-352e-4b90-aa2c-9991e55d3425/resource/ebf9c61c-338f-4f11-888a-914493100dc2/download/e08d0f26-d02b-4e0f-ad5b-4049048a9561.csv",
  "https://data.opencity.in/dataset/87b978d1-352e-4b90-aa2c-9991e55d3425/resource/7521f351-1bf6-429b-962a-028fbcdaf442/download/47c96a83-679b-4937-8287-09375946ac4f.csv"
];

function fetchAndCheck(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const lines = data.split('\n');
        let hasWard21Shettihalli = false;
        let validWards = 0;
        let wards = [];
        
        for (let i = 1; i < lines.length; i++) {
           const line = lines[i].trim();
           if (!line) continue;
           const parts = line.split(',');
           const wardNo = parts[0].replace(/"/g, '');
           // The name might be in index 1 or 2 depending on the csv
           const wardNameStr = line.replace(/"/g, '').toLowerCase();
           if (wardNo == 21 && wardNameStr.includes('shettihalli')) {
               hasWard21Shettihalli = true;
           }
           const wardName = (parts[1] && isNaN(parseInt(parts[1]))) ? parts[1].replace(/"/g, '') : (parts[2] ? parts[2].replace(/"/g, '') : '');
           if (wardNo && wardName) {
              wards.push(`"Ward ${wardNo} - ${wardName}"`);
           }
        }
        
        resolve({url, hasWard21Shettihalli, numWards: wards.length, wards});
      });
    }).on('error', reject);
  });
}

async function run() {
  for (let url of urls) {
    try {
       const res = await fetchAndCheck(url);
       console.log(`URL: ${url} | Wards: ${res.numWards} | Has 21 Shettihalli: ${res.hasWard21Shettihalli}`);
       if (res.hasWard21Shettihalli || res.numWards === 225) {
           fs.writeFileSync('bbmp_wards_final.txt', res.wards.join(',\n      '));
           console.log('Saved bbmp_wards_final.txt with', res.numWards, 'wards.');
           return;
       }
    } catch (e) {
       console.error(e);
    }
  }
}
run();
