import { ShieldAlert, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export const revalidate = 3600; // Cache for 1 hour

export default async function ErrorDetail({ params }: { params: Promise<{ kategori: string, slug: string }> }) {
  const { slug } = await params;
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const errorData = await db.query.errors.findFirst({
    where: eq(schema.errors.slug, slug),
    with: {
      category: true,
    }
  });

  if (!errorData) {
    notFound();
  }

  // Format content (very basic implementation for demonstration)
  // In a real scenario, this would be markdown or HTML handled safely
  const formattedContent = errorData.content.split('\n').filter(p => p.trim().length > 0);

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Ana Sayfa</Link>
        <ChevronRight size={14} />
        <Link href={`/kategori/${errorData.category.slug}`}>{errorData.category.name}</Link>
        <ChevronRight size={14} />
        <span>{errorData.errorCode}</span>
      </nav>

      <div className={styles.contentWrapper}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": errorData.title,
              "datePublished": errorData.createdAt.toISOString(),
              "author": {
                "@type": "Organization",
                "name": "HataÇözümAcil"
              }
            })
          }}
        />
        <article className={styles.mainContent}>
          <header className={styles.header}>
            <div className={styles.errorTags}>
              <span className={styles.errorCode}>{errorData.errorCode}</span>
              <span className={styles.tag}>{errorData.category.name}</span>
            </div>
            <h1 className={styles.title}>{errorData.title}</h1>
            <p className={styles.meta}>Eklenme Tarihi: {new Date(errorData.createdAt).toLocaleDateString('tr-TR')}</p>
          </header>

          <div className={`card ${styles.solutionCard}`}>
            <h2 className={styles.sectionTitle}>
              <ShieldAlert className={styles.iconWarning} />
              Hata Neden Kaynaklanır?
            </h2>
            <p>
              İnternetten otomatik olarak toplanan analizlere göre, bu hata ile karşılaşan çoğu kullanıcının yaşadığı problem aşağıdaki çözümler ile giderilmiştir.
            </p>
          </div>

          <div className={styles.solutionSteps}>
            <h2><CheckCircle2 className={styles.iconSuccess} /> Olası Çözümler ve Kaynaklar</h2>
            
            <div className={styles.step}>
              <div className={styles.stepContent}>
                {formattedContent.map((paragraph, idx) => (
                  <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                ))}
                
                {errorData.sourceUrls && errorData.sourceUrls.length > 0 && (
                  <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--surface-color)', borderRadius: '8px' }}>
                    <p><strong>Kaynak:</strong> <a href={errorData.sourceUrls[0]} target="_blank" rel="noopener noreferrer">{errorData.sourceUrls[0]}</a></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        <aside className={styles.sidebar}>
          <div className={`card ${styles.sidebarCard}`}>
            <h3>Sistem Durumu</h3>
            <p>Bu makale yapay zeka ve otomatik bot sistemimiz tarafından oluşturulmuştur.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
