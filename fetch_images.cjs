const https = require('https');

const files = [
  'File:Kunda_mithai.jpg',
  'File:Indian_ladies_in_Ilkal_saree.jpg',
  'File:Turmeric_field.jpg',
  'File:ISKCON_Temple_Bangalore.jpg',
  'File:Bangalore_Palace_(Front_View).jpg',
  'File:UB_City_Bangalore_2.jpg'
];

const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${files.join('|')}&prop=imageinfo&iiprop=url&format=json`;

const options = {
  headers: {
    'User-Agent': 'CoolBot/1.0 (test@example.com)'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.query.pages;
    for (const key in pages) {
      if (pages[key].imageinfo && pages[key].imageinfo.length > 0) {
        console.log(`${pages[key].title}: ${pages[key].imageinfo[0].url}`);
      }
    }
  });
});
