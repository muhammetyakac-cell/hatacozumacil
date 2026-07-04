import { ShieldAlert, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ErrorDetail({ params }: { params: { kategori: string, slug: string } }) {
  // In real app, fetch from NeonDB using params.slug
  
  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Ana Sayfa</Link>
        <ChevronRight size={14} />
        <Link href={`/kategori/${params.kategori}`}>{params.kategori.charAt(0).toUpperCase() + params.kategori.slice(1)}</Link>
        <ChevronRight size={14} />
        <span>0x800f081f</span>
      </nav>

      <div className={styles.contentWrapper}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": "Windows Update Hatası 0x800f081f Kesin Çözümü",
              "datePublished": "2026-10-14",
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
              <span className={styles.errorCode}>0x800f081f</span>
              <span className={styles.tag}>Windows Update</span>
            </div>
            <h1 className={styles.title}>Windows Update Hatası 0x800f081f Kesin Çözümü</h1>
            <p className={styles.meta}>Son Güncelleme: 14 Ekim 2026 • Okuma Süresi: 3 dk</p>
          </header>

          <div className={`card ${styles.solutionCard}`}>
            <h2 className={styles.sectionTitle}>
              <ShieldAlert className={styles.iconWarning} />
              Hata Neden Kaynaklanır?
            </h2>
            <p>
              Bu hata kodu genellikle Windows'un `.NET Framework 3.5` veya diğer önemli güncellemeleri yüklerken kaynak dosyalarını bulamamasından kaynaklanır. Sistem imaj dosyalarındaki bozulmalar temel etkendir.
            </p>
          </div>

          <div className={styles.solutionSteps}>
            <h2><CheckCircle2 className={styles.iconSuccess} /> Adım Adım Çözüm</h2>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Komut İstemini Yönetici Olarak Çalıştırın</h3>
                <p>Başlat menüsüne <strong>cmd</strong> yazın, sağ tıklayıp "Yönetici olarak çalıştır" seçeneğini seçin.</p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>DISM Aracını Kullanın</h3>
                <p>Aşağıdaki komutu kopyalayın ve komut istemine yapıştırıp Enter'a basın:</p>
                <div className={styles.codeBlock}>
                  <code>DISM /Online /Cleanup-Image /RestoreHealth</code>
                  <button className={styles.copyButton} title="Kopyala"><Copy size={16} /></button>
                </div>
                <p className={styles.note}>Bu işlem internet hızınıza bağlı olarak 15-20 dakika sürebilir. Yüzde 20'de takılı kalmış gibi görünebilir, lütfen bekleyin.</p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Sistem Dosyası Denetleyicisini (SFC) Çalıştırın</h3>
                <p>DISM işlemi başarıyla tamamlandıktan sonra şu komutu girin:</p>
                <div className={styles.codeBlock}>
                  <code>sfc /scannow</code>
                  <button className={styles.copyButton} title="Kopyala"><Copy size={16} /></button>
                </div>
                <p>İşlem bittiğinde bilgisayarınızı yeniden başlatın.</p>
              </div>
            </div>
          </div>
        </article>

        <aside className={styles.sidebar}>
          <div className={`card ${styles.sidebarCard}`}>
            <h3>Benzer Hatalar</h3>
            <ul className={styles.relatedList}>
              <li><Link href="#">0x80070005 Erişim Engellendi</Link></li>
              <li><Link href="#">0x80240438 Güncelleme Hatası</Link></li>
              <li><Link href="#">0x80070422 Windows Update Kapalı</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
