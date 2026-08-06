const fs = require('fs');

const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const dist in data) {
  for (const key in data[dist]) {
    let url = data[dist][key];
    
    if (url.includes('upload.wikimedia.org') && !url.includes('wsrv.nl')) {
      // proxy through wsrv.nl and resize to 800px width for fast loading
      data[dist][key] = `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800`;
    }
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Proxied all Wikipedia URLs!');
