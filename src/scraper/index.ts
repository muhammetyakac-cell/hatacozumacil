import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { translateToTurkish } from './translate';
import slugify from 'slugify';
import { Browser, Page } from 'puppeteer';

puppeteer.use(StealthPlugin());

interface ScrapedData {
  errorCode: string;
  categorySlug: string;
  title: string;
  solution: string;
  sourceUrl: string;
}

export async function scrapeError(errorCode: string, categorySlug: string, categoryName: string, existingBrowser?: Browser) {
  console.log(`Starting scraping for ${errorCode} in ${categoryName}...`);
  const browser = existingBrowser || await puppeteer.launch({ headless: true });
  
  let page: Page | null = null;
  
  try {
    page = await browser.newPage();
    const query = `${errorCode} error fix solution`;
    
    await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(query)}`);
    await page.waitForSelector('.b_algo h2 a');
    
    const firstLink = await page.evaluate(() => {
      const el = document.querySelector('.b_algo h2 a') as HTMLAnchorElement;
      return el ? el.href : null;
    });

    if (!firstLink) {
      console.log('No results found.');
      return;
    }

    console.log(`Found source: ${firstLink}`);
    
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {}),
      page.goto(firstLink, { waitUntil: 'domcontentloaded' })
    ]);
    
    await new Promise(r => setTimeout(r, 2000));
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    $('script, style, nav, footer, header').remove();
    const rawText = $('body').text().replace(/\s+/g, ' ').trim();
    
    const excerpt = rawText.substring(0, 1500) + '...';
    
    console.log('Translating content...');
    const translatedTitle = await translateToTurkish(`${errorCode} Hatası Çözümü`);
    const translatedSolution = await translateToTurkish(excerpt);

    const data: ScrapedData = {
      errorCode,
      categorySlug,
      title: translatedTitle,
      solution: translatedSolution,
      sourceUrl: firstLink
    };

    saveToJson(data);

  } catch (error) {
    console.error(`Error scraping ${errorCode}:`, error);
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
    if (!existingBrowser) {
      await browser.close().catch(() => {});
    }
  }
}

function saveToJson(data: ScrapedData) {
  const dir = path.join(process.cwd(), 'scraped_data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${data.categorySlug}.json`);
  let existingData: ScrapedData[] = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    existingData = JSON.parse(fileContent);
  }

  // Prevent duplicates (both by errorCode and by exact same solution text)
  const isDuplicateCode = existingData.find(d => d.errorCode === data.errorCode);
  const isDuplicateContent = existingData.find(d => d.solution === data.solution);

  if (!isDuplicateCode && !isDuplicateContent) {
    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log(`Saved to ${filePath}`);
  } else {
    if (isDuplicateContent && !isDuplicateCode) {
      console.log('Skipping due to duplicate exact content from search engine.');
    } else {
      console.log('Data already exists in JSON.');
    }
  }
}

// Simple test run if called directly
if (require.main === module) {
  const code = process.argv[2] || '0x800f081f';
  const cat = process.argv[3] || 'windows';
  scrapeError(code, cat, 'Windows Hataları').then(() => {
    console.log('Scraping test complete.');
    process.exit(0);
  });
}
