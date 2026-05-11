const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER LOG:', msg.text());
  });

  page.on('pageerror', err => {
    console.log('BROWSER PAGE ERROR:', err.toString());
  });

  await page.goto('http://localhost:3001', { waitUntil: 'load' });
  console.log("Checked Home Page");

  await page.goto('http://localhost:3001/studio', { waitUntil: 'load' });
  console.log("Checked Studio Page");

  await browser.close();
})();
