import { scrapeError } from './index';

const errorsToScrape = [
  // Windows
  { code: '0x80070005', slug: 'windows', name: 'Windows Hataları' },
  { code: '0x80004005', slug: 'windows', name: 'Windows Hataları' },
  { code: '0xc000007b', slug: 'windows', name: 'Windows Hataları' },
  // HTTP
  { code: '403 Forbidden', slug: 'http', name: 'HTTP Durum Kodları' },
  { code: '502 Bad Gateway', slug: 'http', name: 'HTTP Durum Kodları' },
  { code: '503 Service Unavailable', slug: 'http', name: 'HTTP Durum Kodları' },
  // Web & React
  { code: 'Hydration failed because the initial UI does not match', slug: 'react', name: 'React Hataları' },
  { code: 'Minified React error #130', slug: 'react', name: 'React Hataları' },
];

async function runBulk() {
  console.log(`Starting bulk scraping for ${errorsToScrape.length} errors...`);
  
  for (const item of errorsToScrape) {
    try {
      await scrapeError(item.code, item.slug, item.name);
      // Wait a bit to avoid getting rate-limited too quickly
      console.log('Waiting 5 seconds before next scrape...');
      await new Promise(r => setTimeout(r, 5000));
    } catch (e) {
      console.error(`Skipping ${item.code} due to error.`);
    }
  }
  
  console.log('Bulk scraping finished!');
}

runBulk();
