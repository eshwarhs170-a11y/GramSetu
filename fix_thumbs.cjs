const fs = require('fs');

const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const dist in data) {
  for (const key in data[dist]) {
    let url = data[dist][key];
    
    // Check if it's a wikipedia thumb url
    if (url.includes('/thumb/')) {
      // url is like: https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Yadgir_town_view_from_fort.jpg/960px-Yadgir_town_view_from_fort.jpg
      const parts = url.split('/');
      // The last part is the thumb sizing part (e.g. 960px-...)
      // The second to last part is the actual filename
      // The third to last and fourth to last are the hash directories
      
      // We can just remove the '/thumb' part and the last part
      url = url.replace('/thumb', '');
      url = url.substring(0, url.lastIndexOf('/'));
      
      // Also remove any url parameters like ?utm_source...
      url = url.split('?')[0];
      
      data[dist][key] = url;
    }
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed all thumb URLs to original URLs!');
