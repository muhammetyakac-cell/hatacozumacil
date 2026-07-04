import styles from '../hata/[kategori]/[slug]/page.module.css';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../../db/schema';
import Link from 'next/link';

export const revalidate = 60;

export default async function KategorilerPage() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });
  const categories = await db.select().from(schema.categories);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <article className={styles.mainContent} style={{ width: '100%' }}>
          <header className={styles.header}>
            <h1 className={styles.title}>Tüm Kategoriler</h1>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            {categories.map(cat => (
              <Link key={cat.id} href={`/kategori/${cat.slug}`} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
