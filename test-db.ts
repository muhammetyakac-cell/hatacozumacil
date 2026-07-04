import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function test() {
  const sql = neon(process.env.DATABASE_URL!);
  const categories = await sql`SELECT slug, name FROM hc_categories`;
  console.log("CATEGORIES:", categories);
  
  const errors = await sql`SELECT slug, error_code, title FROM hc_errors LIMIT 10`;
  console.log("ERRORS:", errors);
}

test().catch(console.error);
