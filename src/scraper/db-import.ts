import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema';
import slugify from 'slugify';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function importData() {
  const dir = path.join(process.cwd(), 'scraped_data');
  if (!fs.existsSync(dir)) {
    console.log('No scraped_data folder found.');
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const records = JSON.parse(content);
    
    // Category processing
    const categorySlug = file.replace('.json', '');
    const categoryName = categorySlug.toUpperCase(); // Basic formatting, can be improved
    
    // Check if category exists
    const existingCat = await db.select().from(schema.categories).where(eq(schema.categories.slug, categorySlug));
    let catId = existingCat.length > 0 ? existingCat[0].id : null;

    if (!catId) {
      catId = crypto.randomUUID();
      await db.insert(schema.categories).values({
        id: catId,
        name: categoryName,
        slug: categorySlug,
      });
      console.log(`Created category: ${categoryName}`);
    }

    // Insert errors
    for (const record of records) {
      const errorSlug = slugify(`${record.errorCode} ${record.title}`.substring(0, 100), { lower: true, strict: true });
      
      const existingError = await db.select().from(schema.errors).where(eq(schema.errors.errorCode, record.errorCode));
      
      if (existingError.length === 0) {
        await db.insert(schema.errors).values({
          id: crypto.randomUUID(),
          categoryId: catId,
          errorCode: record.errorCode,
          title: record.title,
          slug: errorSlug,
          content: record.solution,
          sourceUrls: [record.sourceUrl],
        });
        console.log(`Inserted error: ${record.errorCode}`);
      } else {
        console.log(`Error ${record.errorCode} already exists in DB, skipping.`);
      }
    }
  }

  console.log('Import complete.');
}

if (require.main === module) {
  importData().then(() => process.exit(0)).catch(console.error);
}
