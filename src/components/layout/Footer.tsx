import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h3>HataÇözümAcil</h3>
            <p>İnternetteki tüm hata kodları ve kesin çözümleri için en geniş veritabanı.</p>
          </div>
          <div className={styles.links}>
            <h4>Hızlı Bağlantılar</h4>
            <ul>
              <li><Link href="/hakkimizda">Hakkımızda</Link></li>
              <li><Link href="/kategoriler">Tüm Kategoriler</Link></li>
              <li><Link href="/gizlilik">Gizlilik Politikası</Link></li>
              <li><Link href="/iletisim">İletişim</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} HataÇözümAcil. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
