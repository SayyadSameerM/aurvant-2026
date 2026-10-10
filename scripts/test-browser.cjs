const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.log(`[BROWSER ERROR] ${error.message}`);
  });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    console.log('Page loaded successfully. Waiting 35 seconds to see scenes advance...');
    await new Promise(r => setTimeout(r, 35000));
    console.log('Done waiting.');
  } catch (err) {
    console.error('Error navigating:', err);
  } finally {
    await browser.close();
  }
})();
