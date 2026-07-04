import Link from 'next/link';
import { Search, FolderOpen } from 'lucide-react';
import styles from './page.module.css';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema';
import { desc } from 'drizzle-orm';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const dbCategories = await db.select().from(schema.categories);
  const recentErrors = await db.query.errors.findMany({
    with: {
      category: true,
    },
    orderBy: [desc(schema.errors.createdAt)],
    limit: 10,
  });

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Çözülemeyen <span className="text-gradient">Hata</span> Kalmasın
          </h1>
          <p className={styles.heroSubtitle}>
            Milyonlarca hata kodu, log kayıtları ve mavi ekran hataları için internetin en kapsamlı çözüm veritabanı.
          </p>
          
          <div className={styles.heroSearch}>
            <Search className={styles.heroSearchIcon} size={24} />
            <input 
              type="text" 
              className={styles.heroSearchInput} 
              placeholder="Örn: 0x80070005, ERR_CONNECTION_REFUSED, 'Index out of bounds'"
            />
            <button className={styles.heroSearchButton}>Çözüm Bul</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Kategoriler</h2>
        </div>
        
        <div className={styles.grid}>
          {dbCategories.map((cat) => (
            <Link href={`/kategori/${cat.slug}`} key={cat.slug} className={`card ${styles.categoryCard}`}>
              <div className={styles.categoryIconWrapper}>
                <FolderOpen size={32} className={styles.categoryIcon} />
              </div>
              <div className={styles.categoryInfo}>
                <h3>{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Errors Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Son Eklenen Çözümler</h2>
        </div>
        
        <div className={styles.list}>
          {recentErrors.map((error) => (
            <Link href={`/hata/${error.category.slug}/${error.slug}`} key={error.id} className={`card ${styles.errorItem}`}>
              <div className={styles.errorHeader}>
                <span className={styles.errorCode}>{error.errorCode}</span>
                <span className={styles.errorCategory}>{error.category.name}</span>
              </div>
              <h3 className={styles.errorTitle}>{error.title}</h3>
              <p className={styles.errorExcerpt}>
                {error.content.substring(0, 150)}...
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
