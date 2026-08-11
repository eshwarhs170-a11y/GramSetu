/**
 * fetchKarnatakaUrbanData.cjs
 * Fetches Urban Local Bodies and their Wards for Karnataka from LGD
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json, text/html',
        ...headers
      }
    };
    https.get(url, opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Trying LGD API endpoints for Karnataka Urban data...\n');

  // LGD state code for Karnataka is 29
  const karnatakaCode = '29';

  // Try different LGD endpoints
  const endpoints = [
    // Get all ULBs in Karnataka
    `https://lgdirectory.gov.in/lgdSelectStateCode.do?stateCode=${karnatakaCode}&localBodyType=URBAN`,
    `https://lgdirectory.gov.in/lgdSelectLocalBodyCode.do?stateCode=${karnatakaCode}&localBodyType=4`,
    `https://lgdirectory.gov.in/lgdSelectLocalBodyCode.do?stateCode=${karnatakaCode}`,
    // DWR endpoints (used by LGD's AJAX calls)
    `https://lgdirectory.gov.in/dwr/call/plaincall/LGDService.getDistrictsByStateCode.dwr`,
    // Direct download URLs
    `https://lgdirectory.gov.in/demo/downloadDirectory.do?fileType=URBAN_LOCAL_BODIES&state=KARNATAKA`,
    `https://lgdirectory.gov.in/demo/downloadDirectory.do?fileType=WARD&state=KARNATAKA`,
  ];

  for (const url of endpoints) {
    console.log(`Trying: ${url}`);
    try {
      const res = await httpsGet(url);
      console.log(`  Status: ${res.status}`);
      if (res.status === 200 && res.data.length > 100) {
        console.log(`  Data (first 500 chars): ${res.data.substring(0, 500)}`);
        fs.writeFileSync(
          path.join(__dirname, `lgd_response_${Date.now()}.txt`),
          `URL: ${url}\n\n${res.data}`
        );
        console.log(`  Saved to file.\n`);
      } else {
        console.log(`  Empty/error response.\n`);
      }
    } catch (e) {
      console.log(`  Error: ${e.message}\n`);
    }
    await new Promise(r => setTimeout(r, 500));
  }

  // Try the download directory endpoint used in the LGD Excel download
  console.log('\nTrying the LGD Excel download endpoint...');
  const downloadUrl = 'https://lgdirectory.gov.in/demo/downloadDirectory.do';
  try {
    const res = await httpsGet(downloadUrl);
    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    console.log(`First 800 chars:\n${res.data.substring(0, 800)}`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

main().catch(console.error);
