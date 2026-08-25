const fs = require('fs');
const path = require('path');

const filePaths = [
    path.join(__dirname, 'src', 'translations', 'translations.js'),
    path.join(__dirname, 'src', 'pages', 'LandingPage.jsx'),
    path.join(__dirname, 'src', 'pages', 'DistrictPage.jsx'),
    path.join(__dirname, 'src', 'pages', 'OfficialDashboard.jsx'),
    path.join(__dirname, 'src', 'pages', 'VillagerDashboard.jsx'),
    path.join(__dirname, 'src', 'pages', 'VillagerLogin.jsx'),
    path.join(__dirname, 'src', 'pages', 'OfficialLogin.jsx'),
    path.join(__dirname, 'src', 'components', 'FeatureDetails.jsx'),
    path.join(__dirname, 'src', 'data', 'schemesData.js')
];

// Emoji regex matching most emojis
const emojiRegex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;

filePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Remove emojis. Also handle spaces around emojis if they become redundant.
        content = content.replace(emojiRegex, '');
        // Replace double spaces that might result from removing emojis
        content = content.replace(/  +/g, ' ');
        fs.writeFileSync(filePath, content);
        console.log(`Cleaned emojis from ${path.basename(filePath)}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
