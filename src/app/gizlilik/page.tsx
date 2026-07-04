import styles from '../hata/[kategori]/[slug]/page.module.css';

export default function GizlilikPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <article className={styles.mainContent} style={{ width: '100%' }}>
          <header className={styles.header}>
            <h1 className={styles.title}>Gizlilik Politikası</h1>
          </header>
          <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
            <p>HataÇözümAcil olarak gizliliğinize önem veriyoruz. Ziyaretleriniz sırasında toplanan veriler tamamen anonimdir ve hizmet kalitesini artırmak amacıyla kullanılır.</p>
            <p>Üçüncü taraf reklam ağları (Google AdSense vb.) veya analiz araçları (Google Analytics vb.) çerezleri kullanabilir.</p>
          </div>
        </article>
      </div>
    </div>
  );
}
