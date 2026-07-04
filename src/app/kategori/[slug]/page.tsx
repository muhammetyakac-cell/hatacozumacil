import { ShieldAlert, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../hata/[kategori]/[slug]/page.module.css'; // Reuse styles for now
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../../../db/schema';
import { eq, desc } from 'drizzle-orm';

export const revalidate = 60; // Cache for 60 seconds

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const category = await db.query.categories.findFirst({
    where: eq(schema.categories.slug, slug),
  });

  if (!category) {
    notFound();
  }

  const categoryErrors = await db.query.errors.findMany({
    where: eq(schema.errors.categoryId, category.id),
    orderBy: [desc(schema.errors.createdAt)],
    limit: 50,
  });

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Ana Sayfa</Link>
        <ChevronRight size={14} />
        <span>{category.name}</span>
      </nav>

      <div className={styles.contentWrapper}>
        <article className={styles.mainContent} style={{ width: '100%' }}>
          <header className={styles.header}>
            <h1 className={styles.title}>{category.name} Kategorisindeki Hatalar</h1>
            <p className={styles.meta}>Toplam {categoryErrors.length} hata bulundu</p>
          </header>

          <div className={styles.solutionSteps}>
            {categoryErrors.length === 0 ? (
              <p>Bu kategoride henüz hata çözümü bulunmuyor.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {categoryErrors.map((error) => (
                  <li key={error.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <Link href={`/hata/${category.slug}/${error.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>{error.errorCode} - {error.title}</h3>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                        {error.content.substring(0, 150)}...
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
