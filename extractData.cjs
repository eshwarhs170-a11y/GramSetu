const fs = require('fs');
const path = require('path');

const landingPath = path.join(__dirname, 'src', 'pages', 'LandingPage.jsx');
const dataPath = path.join(__dirname, 'src', 'data', 'districtsData.js');

let content = fs.readFileSync(landingPath, 'utf8');

// Find the start of the object
const startIndex = content.indexOf('const districtData = {');

if (startIndex !== -1) {
    // Find the end of the object. It's a huge object.
    // We will count braces to find the end.
    let braceCount = 0;
    let i = startIndex + 'const districtData = '.length;
    let endIndex = -1;
    
    for (; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        else if (content[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
                endIndex = i + 1;
                break;
            }
        }
    }
    
    if (endIndex !== -1) {
        const extracted = content.substring(startIndex, endIndex);
        
        // Write to districtsData.js
        const dataContent = `export ${extracted};\n`;
        fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
        fs.writeFileSync(dataPath, dataContent, 'utf8');
        
        // Remove from LandingPage.jsx and add import
        let newContent = content.substring(0, startIndex) + content.substring(endIndex);
        
        // Add import to top
        if (!newContent.includes('import { districtData }')) {
            newContent = newContent.replace("import { Users", "import { districtData } from '../data/districtsData';\nimport { Users");
        }
        
        fs.writeFileSync(landingPath, newContent, 'utf8');
        console.log("Successfully extracted karnatakaDistricts!");
    } else {
        console.log("Could not find end of object");
    }
} else {
    console.log("Could not find start of object");
}
