import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './src/db/schema';
import { eq } from 'drizzle-orm';
import 'dotenv/config';

async function checkSlug(slug: string) {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });
  const errorData = await db.query.errors.findFirst({
    where: eq(schema.errors.slug, slug),
  });
  console.log('Result:', errorData);
}

checkSlug('0xc0000005-0xc0000005-hatasi-cozumu').catch(console.error);
