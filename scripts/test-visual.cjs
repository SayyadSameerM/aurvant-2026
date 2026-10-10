const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Take screenshot at 2 seconds (Scene 1)
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'scripts/scene1.png' });

  // Take screenshot at 8 seconds (Scene 2)
  await new Promise(r => setTimeout(r, 6000));
  await page.screenshot({ path: 'scripts/scene2.png' });

  // Take screenshot at 15 seconds (Scene 3)
  await new Promise(r => setTimeout(r, 7000));
  await page.screenshot({ path: 'scripts/scene3.png' });

  // Take screenshot at 26 seconds (Scene 4)
  await new Promise(r => setTimeout(r, 11000));
  await page.screenshot({ path: 'scripts/scene4.png' });
  
  // Take screenshot at 35 seconds (Scene 5)
  await new Promise(r => setTimeout(r, 9000));
  await page.screenshot({ path: 'scripts/scene5.png' });

  await browser.close();
  console.log("Screenshots captured!");
})();
