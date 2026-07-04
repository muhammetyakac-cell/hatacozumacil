import styles from '../hata/[kategori]/[slug]/page.module.css';

export default function HakkimizdaPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <article className={styles.mainContent} style={{ width: '100%' }}>
          <header className={styles.header}>
            <h1 className={styles.title}>Hakkımızda</h1>
          </header>
          <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
            <p>HataÇözümAcil, internet dünyasındaki tüm hata kodlarını tek bir çatı altında toplamayı hedefleyen, güncel ve tamamen ücretsiz bir teknoloji platformudur.</p>
            <p>Sistemimiz yapay zeka ve otomatik botlar yardımıyla binlerce hatayı tarar, çözüm makalelerini analiz eder ve size en doğru sonucu sunar.</p>
          </div>
        </article>
      </div>
    </div>
  );
}
