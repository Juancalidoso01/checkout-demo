const fs = require('fs');
const content = fs.readFileSync('i18n.js', 'utf8');
try {
    // extract just the object
    const objStr = content.match(/const translations = (\{[\s\S]*?\});/)[1];
    JSON.parse(objStr);
    console.log("JSON is perfectly valid.");
} catch(e) {
    console.log("Error at position/context:");
    console.log(e.message);
}
