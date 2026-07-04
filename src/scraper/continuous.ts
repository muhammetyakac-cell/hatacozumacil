import { scrapeError } from './index';
import { execSync } from 'child_process';
import puppeteer from 'puppeteer-extra';

// Generate some large lists
const httpCodes = [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];
const windowsCodes = [
  '0x80070057', '0x80070005', '0x80004005', '0x80240034', '0x800f081f', '0x800f0922', '0x80072ee2', '0x80072efd', '0x80070002', '0x8024402f', '0xc000021a', '0xc0000005', '0xc000007b', '0xc0000142', '0xc00000e',
  '0x800ccce5', '0x80040154', '0x80242006', '0x80070422', '0x8007007b', '0x80070015', '0x80072f8f', '0x80092013', '0x8024a105', '0x80070490'
];
const reactCodes = [
  'Minified React error #130', 'Minified React error #152', 'Minified React error #185', 'Minified React error #31', 'Minified React error #321', 'Hydration failed', 'Too many re-renders', 'Maximum update depth exceeded'
];
const pythonCodes = [
  'SyntaxError', 'IndentationError', 'NameError', 'TypeError', 'ValueError', 'KeyError', 'IndexError', 'AttributeError', 'ModuleNotFoundError', 'ZeroDivisionError', 'ImportError', 'StopIteration'
];
const jsCodes = [
  'ReferenceError is not defined', 'TypeError is not a function', 'RangeError Maximum call stack size exceeded', 'SyntaxError Unexpected token', 'URIError URI malformed'
];
const sqlCodes = [
  'ORA-00942', 'ORA-01403', 'ORA-01017', 'MySQL Error 1045', 'MySQL Error 1064', 'MySQL Error 1215', 'PostgreSQL 42P01', 'PostgreSQL 23505', 'PostgreSQL 28P01'
];
const macosCodes = [
  'Mac Error Code 36', 'Mac Error Code 43', 'Mac Error Code 50', 'Mac Error Code 8003', 'Mac Error Code -41', 'Mac Error Code 1309'
];

const allErrors = [
  ...httpCodes.map(c => ({ code: `${c}`, slug: 'http', name: 'HTTP Durum Kodları' })),
  ...windowsCodes.map(c => ({ code: c, slug: 'windows', name: 'Windows Hataları' })),
  ...reactCodes.map(c => ({ code: c, slug: 'react', name: 'React Hataları' })),
  ...pythonCodes.map(c => ({ code: c, slug: 'python', name: 'Python Hataları' })),
  ...jsCodes.map(c => ({ code: c, slug: 'javascript', name: 'JavaScript Hataları' })),
  ...sqlCodes.map(c => ({ code: c, slug: 'veritabani', name: 'Veritabanı Hataları' })),
  ...macosCodes.map(c => ({ code: c, slug: 'macos', name: 'MacOS Hataları' }))
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
