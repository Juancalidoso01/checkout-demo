const fs = require('fs');
const content = fs.readFileSync('i18n.js', 'utf8');

// evaluate the file as much as possible to extract translations
const context = { window: {}, document: { querySelectorAll: () => [], addEventListener: () => {} }, localStorage: { getItem: () => null, setItem: () => {} } };
try {
    const fn = new Function('window', 'document', 'localStorage', content + '; return translations;');
    const translations = fn(context.window, context.document, context.localStorage);
    
    let hasChinese = false;
    for (const [key, value] of Object.entries(translations['es'])) {
        if (/[\u4e00-\u9fff]/.test(value)) {
            console.log('ES has Chinese value for', key, ':', value);
            hasChinese = true;
        }
    }
    if (!hasChinese) console.log("NO CHINESE IN ES");

    // Let's check EN also
    hasChinese = false;
    for (const [key, value] of Object.entries(translations['en'])) {
        if (/[\u4e00-\u9fff]/.test(value)) {
            console.log('EN has Chinese value for', key, ':', value);
            hasChinese = true;
        }
    }
    if (!hasChinese) console.log("NO CHINESE IN EN");
} catch(e) {
    console.log("Error evaluating:", e);
}
