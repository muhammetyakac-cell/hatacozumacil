import Link from 'next/link';
import { Search, Monitor, Terminal, Gamepad, Globe, HardDrive, Smartphone } from 'lucide-react';
import styles from './page.module.css';

const categories = [
  { name: 'Windows Hataları', icon: Monitor, slug: 'windows', count: 1250 },
  { name: 'Yazılım & Kodlama', icon: Terminal, slug: 'yazilim', count: 3420 },
  { name: 'Oyun Hataları', icon: Gamepad, slug: 'oyun', count: 890 },
  { name: 'Web Tarayıcıları', icon: Globe, slug: 'tarayici', count: 450 },
  { name: 'Donanım', icon: HardDrive, slug: 'donanim', count: 320 },
  { name: 'Mobil Uygulamalar', icon: Smartphone, slug: 'mobil', count: 670 },
];

export default function Home() {
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
          <h2>Popüler Kategoriler</h2>
          <Link href="/kategoriler" className={styles.viewAll}>Tümünü Gör &rarr;</Link>
        </div>
        
        <div className={styles.grid}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link href={`/kategori/${cat.slug}`} key={cat.slug} className={`card ${styles.categoryCard}`}>
                <div className={styles.categoryIconWrapper}>
                  <Icon size={32} className={styles.categoryIcon} />
                </div>
                <div className={styles.categoryInfo}>
                  <h3>{cat.name}</h3>
                  <p>{cat.count} Çözüm</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Errors Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Son Eklenen Çözümler</h2>
        </div>
        
        <div className={styles.list}>
          {/* Mock data for now */}
          {[1, 2, 3, 4, 5].map((i) => (
            <Link href={`/hata/windows/0x800f081f-guncellestirme-hatasi`} key={i} className={`card ${styles.errorItem}`}>
              <div className={styles.errorHeader}>
                <span className={styles.errorCode}>0x800f081f</span>
                <span className={styles.errorCategory}>Windows</span>
              </div>
              <h3 className={styles.errorTitle}>Windows Update Hatası 0x800f081f Kesin Çözümü</h3>
              <p className={styles.errorExcerpt}>
                Bu hata genellikle Windows'un gerekli dosyaları indirememesinden kaynaklanır. DISM aracı ile sistem imajını onararak...
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
