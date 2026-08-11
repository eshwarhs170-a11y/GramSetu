const xlsx = require('xlsx');

const filePath = "C:\\Users\\Eshwar H S\\Downloads\\Karnataka_District_Taluk_Village_GramPanchayat-1.xlsx";
try {
  const workbook = xlsx.readFile(filePath);
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  
  const matches = data.filter(row => 
    String(row['Taluk/Sub-district']).toLowerCase().includes('gubbi')
  );
  
  const gubbiGPs = [...new Set(matches.map(m => m['Gram Panchayat']))].sort();
  console.log("Total GPs in Gubbi:", gubbiGPs.length);
  console.log("Does Hosakere exist?", gubbiGPs.includes('Hosakere'));
  
  const hosakereVillages = matches.filter(m => String(m['Gram Panchayat']).toLowerCase() === 'hosakere');
  console.log("Villages in Hosakere GP:", hosakereVillages.map(v => v['Village']));

  const hagalavadiGPs = matches.filter(m => String(m['Gram Panchayat']).toLowerCase().includes('hagalavadi'));
  console.log("Villages in Hagalavadi GP:", hagalavadiGPs.map(v => v['Village']));

  const hull = matches.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes("hullekere")));
  console.log("Hullekere matches in Gubbi:");
  console.log(hull);

  // Search for Hullekere Palya (might be spelled differently)
  const palya = matches.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes("palya")));
  console.log("Some Palya villages in Gubbi:", palya.map(v => v['Village']).slice(0, 5));

} catch(e) {
  console.error(e.message);
}
