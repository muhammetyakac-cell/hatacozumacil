import styles from '../hata/[kategori]/[slug]/page.module.css';

export default function IletisimPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <article className={styles.mainContent} style={{ width: '100%' }}>
          <header className={styles.header}>
            <h1 className={styles.title}>İletişim</h1>
          </header>
          <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
            <p>Hata bildirimleriniz, telif hakkı uyarılarınız veya diğer önerileriniz için aşağıdaki e-posta adresinden bize ulaşabilirsiniz:</p>
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--surface-color)', borderRadius: '8px', fontWeight: 'bold' }}>
              Email: iletisim@hatacozumacil.com
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
