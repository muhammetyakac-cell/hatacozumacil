import { scrapeError } from './index';
import { execSync } from 'child_process';
import puppeteer from 'puppeteer-extra';

// Generate some large lists
const httpCodes = [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];
const windowsCodes = [
  '0x80070057', '0x80070005', '0x80004005', '0x80240034', '0x800f081f', '0x800f0922', '0x80072ee2', '0x80072efd', '0x80070002', '0x8024402f', '0xc000021a', '0xc0000005', '0xc000007b', '0xc0000142', '0xc00000e'
];
const reactCodes = [
  'Minified React error #130', 'Minified React error #152', 'Minified React error #185', 'Minified React error #31', 'Minified React error #321', 'Hydration failed'
];

const allErrors = [
  ...httpCodes.map(c => ({ code: `${c}`, slug: 'http', name: 'HTTP Durum Kodları' })),
  ...windowsCodes.map(c => ({ code: c, slug: 'windows', name: 'Windows Hataları' })),
  ...reactCodes.map(c => ({ code: c, slug: 'react', name: 'React Hataları' }))
];

async function runContinuous() {
  console.log(`Starting continuous scraping for ${allErrors.length} errors...`);
  const browser = await puppeteer.launch({ headless: true });

  try {
    for (const item of allErrors) {
      try {
        console.log(`\n--- Processing: ${item.code} ---`);
        await scrapeError(item.code, item.slug, item.name, browser as any);
        
        // Sleep between 10 to 20 seconds to avoid ban
        const sleepTime = Math.floor(Math.random() * 10000) + 10000;
        console.log(`Waiting ${sleepTime/1000} seconds before next scrape...`);
        await new Promise(r => setTimeout(r, sleepTime));
      } catch (e) {
        console.error(`Skipping ${item.code} due to error:`, e);
      }
    }
  } finally {
    await browser.close();
  }
  
  console.log('Continuous scraping finished! Now injecting into database...');
  execSync('npm run db:import', { stdio: 'inherit' });
  console.log('All data injected successfully!');
}

runContinuous();
