import styles from '../hata/[kategori]/[slug]/page.module.css';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../../db/schema';
import Link from 'next/link';
import { desc } from 'drizzle-orm';

export const revalidate = 60;

export default async function SonHatalarPage() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });
  
  const recentErrors = await db.query.errors.findMany({
    with: { category: true },
    orderBy: [desc(schema.errors.createdAt)],
    limit: 50,
  });

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <article className={styles.mainContent} style={{ width: '100%' }}>
          <header className={styles.header}>
            <h1 className={styles.title}>En Son Eklenen Hatalar</h1>
          </header>
          <div style={{ marginTop: '2rem' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recentErrors.map((error) => (
                <li key={error.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <Link href={`/hata/${error.category.slug}/${error.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{error.errorCode}</span>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>{error.category.name}</span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>{error.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                      {error.content.substring(0, 150)}...
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
