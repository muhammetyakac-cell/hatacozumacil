import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const dir = path.join(process.cwd(), 'drizzle');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
  
  for (const file of files) {
    console.log(`Applying migration: ${file}`);
    const sqlFile = fs.readFileSync(path.join(dir, file), 'utf8');
    
    try {
      const queries = sqlFile.split(';').filter(q => q.trim().length > 0);
      for (const query of queries) {
          console.log(`Executing: ${query.substring(0, 50)}...`);
          await sql.query(query);
      }
      console.log(`Migration ${file} applied successfully!`);
    } catch (error) {
      console.error(`Migration ${file} failed:`, error);
    }
  }
}

main();
