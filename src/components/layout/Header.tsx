import Link from 'next/link';
import { Search, ShieldAlert } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`${styles.header} glass`}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <ShieldAlert className={styles.logoIcon} />
          <span className="text-gradient">HataÇözümAcil</span>
        </Link>
        
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} size={18} />
          <input 
            type="text" 
            placeholder="Hata kodu veya açıklama ara..." 
            className={styles.searchInput}
          />
        </div>

        <nav className={styles.nav}>
          <Link href="/kategoriler" className={styles.navLink}>Kategoriler</Link>
          <Link href="/son-hatalar" className={styles.navLink}>Son Çözümler</Link>
        </nav>
      </div>
    </header>
  );
}
