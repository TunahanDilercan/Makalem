export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  readTime: number
  views: number
  tags: string[]
  publishedAt: string
  updatedAt: string
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  count: number
  color: string
}

export const CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'bioinformatics',
    name: 'Bioinformatics',
    description: 'Computational analysis of omics data and reproducible pipelines',
    icon: 'Code2',
    count: 3,
    color: 'oklch(0.488 0.243 264.376)',
  },
  {
    id: '2',
    slug: 'molecular-biology',
    name: 'Molecular Biology',
    description: 'Experimental design, assay quality, and gene editing methods',
    icon: 'Layers',
    count: 2,
    color: 'oklch(0.6 0.118 184.704)',
  },
  {
    id: '3',
    slug: 'genomics',
    name: 'Genomics',
    description: 'Variant interpretation, population signals, and clinical relevance',
    icon: 'BarChart2',
    count: 1,
    color: 'oklch(0.769 0.188 70.08)',
  },
  {
    id: '4',
    slug: 'biostatistics',
    name: 'Biostatistics',
    description: 'Statistical inference, power analysis, and multiple testing control',
    icon: 'Shield',
    count: 1,
    color: 'oklch(0.696 0.17 162.48)',
  },
  {
    id: '5',
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    description: 'Foundation models, retrieval systems, and scientific NLP',
    icon: 'Server',
    count: 2,
    color: 'oklch(0.627 0.265 303.9)',
  },
  {
    id: '6',
    slug: 'systems-biology',
    name: 'Systems Biology',
    description: 'Network models, pathway dynamics, and mechanistic simulation',
    icon: 'Paintbrush',
    count: 1,
    color: 'oklch(0.645 0.246 16.439)',
  },
]

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'rna-seq-diferansiyel-ifade-analizi-akademik-rehber',
    title: 'RNA-seq Verilerinde Diferansiyel İfade Analizi: Akademik Rehber',
    excerpt:
      'RNA-seq deney tasarımından istatistiksel model seçimine kadar diferansiyel ifade analizi için uçtan uca akademik bir çerçeve sunar.',
    content: `## Özet

RNA-seq diferansiyel ifade analizi, deney biyolojisi ile istatistiksel modellemeyi doğrudan birleştiren temel bir biyoinformatik problemidir. Bu makalede örneklem büyüklüğü, kütüphane hazırlama etkileri, normalizasyon stratejileri ve çoklu test düzeltmeleri birlikte ele alınır.

## Deney Tasarımının Etkisi

Karşılaştırılabilir biyolojik tekrarlar, teknik tekrarların yerine geçmez. Özellikle biyolojik varyansın yüksek olduğu dokularda grup başına en az 5-6 örnek önerilir. Batch etkisi bekleniyorsa model matrisine deney serisi değişkeni dahil edilmelidir.

## Ön İşleme ve Kalite Kontrol

Ham okuma kalitesi, adaptör kalıntıları ve düşük kalite bazlar temizlenmeden sayım matrisi üretilmemelidir. Haritalama sonrası düşük kapsama sahip genler filtrelenerek modelin gürültüye duyarlılığı azaltılır.

## Normalizasyon ve Modelleme

Kütüphane büyüklüğü farklarını telafi etmek için robust normalizasyon yöntemleri tercih edilmelidir. Negatif binom aileli modeller, RNA-seq dağılımını pratikte iyi temsil eder. Grup karşılaştırmalarında etki büyüklüğü ve güven aralığı p-değeri ile birlikte raporlanmalıdır.

## Bulguların Yorumu

Sadece istatistiksel anlamlılık yeterli değildir. Biyolojik bağlam için yolak zenginleştirme analizi ve literatür destekli fonksiyonel doğrulama gerekir. Klinik ya da translasyonel çalışmalarda bağımsız doğrulama kohortu eklenmesi önerilir.

## Sonuç

RNA-seq diferansiyel ifade analizi, doğru tasarım ve doğru model birleştiğinde yüksek biyolojik değer üretir. Tek başına yazılım çıktısı değil, deneysel bağlamla bütünleşmiş bir analitik yaklaşım hedeflenmelidir.

## Uygulama Kutucuğu

> Hızlı karar: Örneklem sayısı sınırlıysa yalnızca p-değeri raporlamak yerine etki büyüklüğü ve güven aralığı birlikte sunulmalıdır.

## Karar Tablosu

| Karar Noktası | Önerilen Yaklaşım | Pratik Not |
|---|---|---|
| Düşük sayım genler | Filtreleme (CPM / minimum count) | Gürültüyü azaltır |
| Grup karşılaştırması | Negatif binom model | DESeq2 veya edgeR uygundur |
| Batch etkisi | Model matrisine kovaryat ekleme | Deney başında planlanmalıdır |

## Şekil 1: Önerilen RNA-seq Analiz Akışı

> FASTQ -> Kalite kontrol -> Hizalama/kuantifikasyon -> Sayım matrisi -> Normalizasyon -> Diferansiyel ifade -> Yolak analizi`,
    category: 'Bioinformatics',
    author: { name: 'Dr. Elif Akar', avatar: '', initials: 'EA' },
    readTime: 11,
    views: 21400,
    tags: ['RNA-seq', 'Diferansiyel İfade', 'Biyoinformatik', 'İstatistik'],
    publishedAt: '2025-01-12',
    updatedAt: '2025-05-04',
    featured: true,
  },
  {
    id: '2',
    slug: 'tek-hucreli-rna-seq-hucre-atlasi-yaklasimi',
    title: 'Tek Hücreli RNA-seq ile Hücre Atlasi Analizi',
    excerpt:
      'Tek hücreli transkriptomik verilerde kümeleme, batch düzeltme ve hücre tipi anotasyonu için güncel akademik yaklaşım önerileri içerir.',
    content: `## Giriş

Tek hücreli RNA-seq, heterojen dokularda hücre-alt popülasyonlarını çözümlemek için altın standart yöntemlerden biri haline gelmiştir. Ancak veri seyrekliğinin yüksek olması, klasik bulk RNA-seq boru hatlarının doğrudan kullanımını sınırlar.

## Kalite Ölçütleri

Hücre başına gen sayısı, mitokondriyal transkript yüzdesi ve toplam UMI dağılımı, ilk eleme için temel metriklerdir. Aşırı yüksek UMI değerleri olası doublet varlığına işaret eder.

## Boyut İndirgeme ve Kümeleme

Yüksek değişken gen seçimi sonrası PCA, UMAP ve graf-temelli kümeleme sıralaması pratikte yaygın kabul görür. Küme stabilitesi yalnızca görsel ayrışma ile değil, tekrarlanabilirlik analizi ile test edilmelidir.

## Batch Düzeltme

Birden fazla merkezden üretilen verilerde teknik kaynaklı ayrışma biyolojik sinyali maskeleyebilir. Entegrasyon yöntemleri uygulanırken biyolojik varyasyonun baskılanmaması kritik bir değerlendirme kriteridir.

## Hücre Tipi Anotasyonu

Anotasyon, marker gen setleri ve referans atlaslarla birlikte yürütülmelidir. Sadece otomatik etiketleme çıktıları ile karar vermek yerine manuel kürasyon yapılması yayın kalitesi açısından önemlidir.

## Sonuç

Tek hücreli analiz, yöntem seçimi kadar raporlama disiplinine de bağlıdır. Parametrelerin şeffaf paylaşımı ve yeniden üretilebilir analiz defterleri akademik güvenirliği doğrudan artırır.

## Kalite Kutucuğu

> Hücre filtreleme eşikleri veri setine göre kalibre edilmelidir; tek bir sabit eşik her dokuda aynı kaliteyi vermez.

## Anotasyon Tablosu

| Adım | Minimum Çıktı | Sık Hata |
|---|---|---|
| QC ve filtrasyon | Hücre başına gen/UMI dağılımı | Aşırı agresif hücre eleme |
| Batch entegrasyonu | Entegrasyon sonrası karışım kontrolü | Biyolojik sinyalin baskılanması |
| Hücre tipi anotasyonu | Marker + referans atlas uyumu | Tek otomatik etikete aşırı güven |

## Şekil 1: scRNA-seq İş Akışı

> Hücre çağırma -> QC -> Değişken gen seçimi -> Boyut indirgeme -> Kümeleme -> Marker analizi -> Hücre tipi anotasyonu`,
    category: 'Bioinformatics',
    author: { name: 'Dr. Berke Kılıç', avatar: '', initials: 'BK' },
    readTime: 10,
    views: 17350,
    tags: ['scRNA-seq', 'UMAP', 'Kümeleme', 'Hücre Atlasi'],
    publishedAt: '2025-02-03',
    updatedAt: '2025-05-09',
  },
  {
    id: '3',
    slug: 'metagenomik-assembly-kalite-olcutleri-ve-degerlendirme',
    title: 'Metagenomik Assembly Kalite Ölçütleri ve Değerlendirme Stratejisi',
    excerpt:
      'Metagenomik çalışmalarda assembly başarısını N50 dışındaki biyolojik ve istatistiksel metriklerle birlikte değerlendiren bir inceleme sunar.',
    content: `## Özet

Metagenomik assembly performansı tek bir metrikle değerlendirilemez. Özellikle çevresel örneklerde tür çeşitliliği ve kapsama dağılımı, assembly kalitesini doğrudan etkiler.

## Sık Kullanılan Metrikler

N50, contig uzunluğu için sezgisel bir özet verir ancak biyolojik doğruluk garantisi sunmaz. Tamlık, kontaminasyon ve marker-gen temelli değerlendirme metrikleri birlikte kullanılmalıdır.

## Coverage ve Binning Etkileşimi

Düşük bolluktaki türlerde parça parça assembly oluşumu beklenir. Binning adımında yanlış kümelenmeyi azaltmak için coverage profili ve k-mer kompozisyonu birlikte değerlendirilmelidir.

## Referanssız Doğrulama

Yeni veya az temsil edilen mikrobiyal topluluklarda referans bazlı yaklaşım sınırlıdır. Bu nedenle tek-kopya ortolog setleri ve çapraz örnek tutarlılığı önemli kalite göstergeleridir.

## Sonuç

Metagenomik assembly başarısı, algoritma seçimi kadar kalite raporlama standardına bağlıdır. Akademik çalışmalarda pipeline parametrelerinin ayrıntılı paylaşımı ve denetimli kalite tablosu önerilir.

## Değerlendirme Kutucuğu

> N50 tek başına başarı ölçütü değildir; tamlık ve kontaminasyon metrikleri birlikte raporlanmalıdır.

## Assembly Değerlendirme Tablosu

| Metrik | Ne Ölçer | Yorum |
|---|---|---|
| N50 | Parça uzunluğu özeti | Tek başına biyolojik doğruluk vermez |
| Tamlık | Beklenen genom içeriği | Yüksek olması tercih edilir |
| Kontaminasyon | Karışık genomik sinyal | Düşük olması kritik |

## Şekil 1: Metagenomik Boru Hattı

> Ham okuma -> Assembly -> Contig kalite kontrol -> Binning -> MAG kalite analizi -> Fonksiyonel anotasyon`,
    category: 'Bioinformatics',
    author: { name: 'Dr. Mert Erdem', avatar: '', initials: 'ME' },
    readTime: 9,
    views: 14120,
    tags: ['Metagenomik', 'Assembly', 'Kalite Kontrol', 'Binning'],
    publishedAt: '2025-03-18',
    updatedAt: '2025-05-11',
  },
  {
    id: '4',
    slug: 'crispr-cas9-off-target-analizi-ve-deney-tasarimi',
    title: 'CRISPR-Cas9 Off-target Analizi ve Deney Tasarımı',
    excerpt:
      'CRISPR deneylerinde off-target riskini azaltmak için gRNA tasarımından doğrulama stratejilerine kadar akademik bir yol haritası sunar.',
    content: `## Giriş

CRISPR-Cas9 tabanlı gen düzenleme çalışmalarında biyolojik etkinlik kadar hedef dışı kesim riski de kritik bir kalite parametresidir. Klinik potansiyel taşıyan çalışmalarda off-target yükünün nicel raporlanması beklenir.

## gRNA Tasarım İlkeleri

Yüksek özgüllük skoru, dengeli GC oranı ve genomik tekrar bölgelerinden kaçınma temel kriterlerdir. Birden fazla aday rehber RNA'nın ön elemeden geçirilmesi deney başarısını artırır.

## Deneysel Doğrulama

Sadece in silico skorlarla karar vermek yeterli değildir. Amplicon-seq ve hedefli derin dizileme yaklaşımları, beklenen ve beklenmeyen kesim olaylarını doğrulamak için birlikte kullanılmalıdır.

## İstatistiksel Raporlama

Düzenleme verimliliği, güven aralığıyla birlikte raporlanmalı; biyolojik tekrarlar arası varyans ayrı gösterilmelidir. Negatif kontroller ve sham koşullar yayınlanabilirlik açısından zorunludur.

## Sonuç

CRISPR deneylerinde güçlü sonuç, yüksek düzenleme oranı ile düşük off-target riskinin birlikte gösterilmesiyle elde edilir. Tasarım, doğrulama ve raporlama üçlüsü akademik güvenilirliğin temelidir.

## Deney Planı Kutucuğu

> Off-target analizi, en az iki bağımsız doğrulama tekniği ile desteklenmeden tamamlanmış kabul edilmemelidir.

## Doğrulama Tablosu

| Yöntem | Güçlü Yan | Sınırlılık |
|---|---|---|
| GUIDE-seq | Genome-wide tarama | Laboratuvar karmaşıklığı |
| Amplicon-seq | Hedef bölgede yüksek derinlik | Sınırlı bölge kapsamı |
| Hedefli derin dizileme | Duyarlı mutasyon tespiti | Panel tasarımına bağımlılık |`,
    category: 'Molecular Biology',
    author: { name: 'Dr. Zeynep Karaca', avatar: '', initials: 'ZK' },
    readTime: 10,
    views: 19800,
    tags: ['CRISPR', 'Cas9', 'Off-target', 'Gen Düzenleme'],
    publishedAt: '2025-01-27',
    updatedAt: '2025-05-07',
    featured: true,
  },
  {
    id: '5',
    slug: 'qpcr-verilerinde-normalizasyon-ve-gecerlilik-kriterleri',
    title: 'qPCR Verilerinde Normalizasyon ve Geçerlilik Kriterleri',
    excerpt:
      'Moleküler biyoloji çalışmalarında qPCR sonuçlarının güvenilirliği için referans gen seçimi, teknik tekrar ve analiz raporlaması ilkelerini özetler.',
    content: `## Özet

qPCR deneylerinde analitik güvenilirlik, yalnızca Ct değerlerinin raporlanmasıyla sağlanamaz. Referans gen stabilitesi, amplifikasyon verimliliği ve teknik tekrar tutarlılığı birlikte değerlendirilmelidir.

## Referans Gen Seçimi

Tek bir housekeeping genine bağlı kalmak, biyolojik koşullar arasında yanlılık oluşturabilir. En az iki referans genin stabilitesi test edilerek normalizasyon katsayısı belirlenmelidir.

## Verimlilik ve Primer Performansı

Primer verimliliği standart eğri ile doğrulanmalı; kabul edilebilir aralık dışındaki primer setleri analizden çıkarılmalıdır. Melt curve incelemesi, özgüllük kontrolü için zorunludur.

## İstatistiksel Sunum

Fold-change sonuçları güven aralıkları ve uygun hipotez testi ile birlikte sunulmalıdır. Teknik tekrar ve biyolojik tekrar ayrımı açıkça raporlanmalıdır.

## Sonuç

qPCR analizi, laboratuvar pratiği ve istatistiksel doğrulamanın birlikte yürütülmesini gerektirir. Yayınlanabilir sonuç için ham veri izlenebilirliği ve yöntem şeffaflığı kritik önemdedir.

## Raporlama Kutucuğu

> Ct değerleri tek başına sonuç değildir; verimlilik, referans gen stabilitesi ve teknik tekrar tutarlılığı birlikte değerlendirilmelidir.

## qPCR Kontrol Tablosu

| Kontrol Adımı | Kabul Kriteri | Aksiyon |
|---|---|---|
| Primer verimliliği | Kabul aralığında eğim | Uygun olmayan primeri dışla |
| Melt curve | Tek ve özgül pik | Non-spesifik üründe yeniden tasarım |
| Referans gen | Stabil ifade | En az iki referans gen kullan |`,
    category: 'Molecular Biology',
    author: { name: 'Dr. Aslı Tuna', avatar: '', initials: 'AT' },
    readTime: 8,
    views: 12640,
    tags: ['qPCR', 'Normalizasyon', 'Referans Gen', 'Moleküler Biyoloji'],
    publishedAt: '2025-02-21',
    updatedAt: '2025-04-29',
  },
  {
    id: '6',
    slug: 'kanser-genomiginde-varyant-onceliklendirme',
    title: 'Kanser Genomiğinde Varyant Önceliklendirme Yaklaşımları',
    excerpt:
      'Somatik varyant analizinde filtreleme, anotasyon ve klinik anlamlandırma adımlarını akademik raporlama perspektifiyle değerlendirir.',
    content: `## Giriş

Kanser genomik analizinde varyant sayısı yüksek, klinik olarak anlamlı sinyal ise sınırlıdır. Bu nedenle önceliklendirme süreci biyoinformatik filtrelerle klinik bağlamın birlikte değerlendirilmesini gerektirir.

## Filtreleme Katmanı

Düşük kalite skorları, yetersiz kapsama ve tekrarlayan artefakt bölgeleri ilk aşamada elenir. Ardından popülasyon frekansı yüksek varyantlar çıkarılarak nadir ve olası etkili adaylara odaklanılır.

## Fonksiyonel Anotasyon

Varyantların protein etkisi, korunmuş bölgelerdeki konumu ve bilinen hastalık ilişkileri bütünleşik yorumlanmalıdır. Tek başına tek bir skor yerine çoklu anotasyon tablosu kullanılmalıdır.

## Klinik Sınıflandırma

Klinik karar desteği için varyantın kanıt düzeyi, hedeflenebilirlik ve tedaviye etkisi açık bir şemayla raporlanır. Belirsiz önem taşıyan varyantların ayrı sınıfta tutulması önerilir.

## Sonuç

Başarılı varyant önceliklendirme, teknik kalite ölçütleri ile klinik yorum kriterlerini birleştiren çok katmanlı bir süreçtir. Rapor standardizasyonu çok merkezli çalışmalar için özellikle önemlidir.

## Klinik Öncelik Kutucuğu

> Önceliklendirme listesi, teknik skor + klinik kanıt + tedavi uygulanabilirliği üçlüsü ile verilmelidir.

## Varyant Sınıflama Tablosu

| Sınıf | Kanıt Düzeyi | Önerilen Yaklaşım |
|---|---|---|
| Yüksek öncelik | Güçlü literatür + klinik ilişki | Hızlı doğrulama ve raporlama |
| Orta öncelik | Kısmi fonksiyonel kanıt | Ek fonksiyonel analiz |
| Düşük öncelik | Zayıf/belirsiz kanıt | İzlem ve yeniden değerlendirme |`,
    category: 'Genomics',
    author: { name: 'Dr. Cem Eren', avatar: '', initials: 'CE' },
    readTime: 9,
    views: 15210,
    tags: ['Kanser Genomiği', 'Somatik Varyant', 'Anotasyon', 'Klinik Biyoinformatik'],
    publishedAt: '2025-03-05',
    updatedAt: '2025-05-02',
  },
  {
    id: '7',
    slug: 'biyostatistikte-coklu-karsilastirma-duzeltmeleri',
    title: 'Biyoistatistikte Çoklu Karşılaştırma Düzeltmeleri',
    excerpt:
      'Yüksek boyutlu biyomedikal verilerde yanlış pozitif oranını kontrol etmek için Bonferroni, Holm ve FDR tabanlı düzeltmeleri karşılaştırır.',
    content: `## Özet

Yüksek boyutlu biyomedikal veri analizlerinde aynı anda çok sayıda hipotez test edilir. Bu durumda ham p-değerleri doğrudan yorumlandığında yanlış pozitif oranı ciddi biçimde artar.

## Ailewise Hata Oranı

Bonferroni ve Holm yöntemleri ailewise hata oranını kontrol eder. Güç kaybı pahasına daha katı bir koruma sağlarlar ve özellikle küçük hipotez kümelerinde tercih edilirler.

## Yanlış Keşif Oranı

Benjamini-Hochberg tabanlı FDR yaklaşımı, omik çalışmalar gibi binlerce testin yapıldığı analizlerde daha dengeli bir seçenek sunar. Hem keşif gücü hem de hata kontrolü arasında pratik bir denge kurar.

## Uygulama Notları

Etki büyüklüğü raporlanmadan sadece düzeltilmiş p-değerine odaklanmak biyolojik yorum için yetersizdir. Özellikle klinik kararlarda güven aralığı ve bağımsız doğrulama adımı önerilir.

## Sonuç

Çoklu karşılaştırma düzeltmesi, modern biyomedikal araştırmada bir seçenek değil zorunluluktur. Yöntem seçimi, çalışmanın hipotez yapısı ve veri boyutuna göre gerekçelendirilmelidir.

## İstatistik Kutucuğu

> Çoklu test düzeltmesi uygulanmadan elde edilen keşif sonuçları, klinik karar desteği için doğrudan kullanılmamalıdır.

## Yöntem Karşılaştırma Tablosu

| Yöntem | Hata Kontrolü | Ne Zaman Uygun |
|---|---|---|
| Bonferroni | Ailewise hata oranı | Az sayıda test, katı kontrol |
| Holm | Ailewise hata oranı | Bonferroni'ye göre daha dengeli |
| Benjamini-Hochberg | Yanlış keşif oranı | Omik veri gibi yüksek test sayısı |`,
    category: 'Biostatistics',
    author: { name: 'Dr. Selin Çelik', avatar: '', initials: 'SÇ' },
    readTime: 8,
    views: 11890,
    tags: ['Biyoistatistik', 'FDR', 'Bonferroni', 'Hipotez Testi'],
    publishedAt: '2025-01-30',
    updatedAt: '2025-04-26',
  },
  {
    id: '8',
    slug: 'sistem-biyolojisinde-ag-modelleme-ve-simulasyon',
    title: 'Sistem Biyolojisinde Ağ Modelleme ve Simülasyon',
    excerpt:
      'Biyolojik yolakların ağ temsili üzerinden dinamik modelleme, parametre kestirimi ve mekanistik hipotez üretimi için akademik bir çerçeve sunar.',
    content: `## Giriş

Sistem biyolojisi, karmaşık biyolojik süreçleri tekil gen düzeyinden çok etkileşim ağları üzerinden açıklamayı hedefler. Ağ modelleme, mekanistik hipotez üretimi için güçlü bir araçtır.

## Model Türleri

Boolean ağlar, sınırlı veri koşullarında hızlı hipotez üretimi sağlar. Diferansiyel denklem tabanlı modeller ise kinetik parametrelerle daha ayrıntılı dinamik analiz imkanı verir.

## Parametre Kestirimi

Parametrelerin tanımlanabilirliği kontrol edilmeden model yorumu yapmak yanıltıcı olabilir. Duyarlılık analizi ve çapraz doğrulama, modelin genellenebilirliğini değerlendirmek için önerilir.

## Biyolojik Yorum

Ağ merkeziliği, geri besleme döngüleri ve modüler yapı analizi, hedef gen ya da protein adaylarının önceliklendirilmesinde kullanışlıdır. Ancak deneysel doğrulama adımı mutlaka gereklidir.

## Sonuç

Sistem biyolojisi modelleri, deney tasarımını yönlendiren güçlü bir karar desteği sağlar. Akademik çalışmalarda model varsayımlarının açık raporlanması ve tekrarlanabilir simülasyon senaryoları kritik önemdedir.

## Modelleme Kutucuğu

> Parametre tanımlanabilirliği doğrulanmadan mekanistik yorum yapılması model güvenilirliğini düşürür.

## Ağ Analizi Tablosu

| Bileşen | Amaç | Beklenen Çıktı |
|---|---|---|
| Ağ çıkarımı | Etkileşim yapısını kurmak | Düğüm/kenar matrisi |
| Dinamik simülasyon | Zaman içi davranışı izlemek | Durum geçiş senaryoları |
| Duyarlılık analizi | Kritik parametreleri bulmak | Müdahale öncelik listesi |

## Şekil 1: Sistem Biyolojisi Model Akışı

> Veri katmanı -> Ağ çıkarımı -> Dinamik simülasyon -> Duyarlılık analizi -> Deneysel doğrulama`,
    category: 'Systems Biology',
    author: { name: 'Dr. Onur Yalçın', avatar: '', initials: 'OY' },
    readTime: 9,
    views: 10940,
    tags: ['Sistem Biyolojisi', 'Ağ Analizi', 'Simülasyon', 'Modelleme'],
    publishedAt: '2025-02-16',
    updatedAt: '2025-05-01',
  },
  {
    id: '9',
    slug: 'foundation-models-for-biomedical-literature-mining',
    title: 'Foundation Models for Biomedical Literature Mining',
    excerpt:
      'A structured overview of how large language models can support biomedical evidence extraction while preserving traceability and auditability.',
    content: `## Abstract

Biomedical literature mining is increasingly supported by foundation models. However, high-stakes domains require not only extraction performance but also evidence traceability, calibration, and reproducibility.

## Task Decomposition

Robust systems separate document retrieval, claim extraction, and evidence grounding into explicit stages. This decomposition reduces error propagation and enables targeted evaluation.

## Evaluation Protocols

Beyond F1 score, biomedical pipelines should report citation accuracy, hallucination rate, and consistency across model seeds. Human expert adjudication remains necessary for ambiguous claims.

## Safety and Governance

Model outputs must be linked to source passages and publication metadata. Versioned prompts, deterministic decoding policies, and model card documentation support regulatory readiness.

## Conclusion

Foundation models can accelerate literature synthesis, but only when integrated with transparent retrieval and strict evaluation protocols. Trustworthiness is a system property, not a model property alone.

## Governance Box

> Evidence grounding and citation traceability should be mandatory for biomedical deployment scenarios.

## Evaluation Table

| Metric | Why It Matters | Target Practice |
|---|---|---|
| Citation accuracy | Prevents unsupported claims | Passage-level evidence checks |
| Hallucination rate | Measures factual risk | Guardrail prompts + abstention |
| Reproducibility | Supports auditability | Versioned prompts and seeds |`,
    category: 'Artificial Intelligence',
    author: { name: 'Dr. Lena Morris', avatar: '', initials: 'LM' },
    readTime: 8,
    views: 16580,
    tags: ['LLM', 'Biomedical NLP', 'Literature Mining', 'Evaluation'],
    publishedAt: '2025-03-11',
    updatedAt: '2025-05-10',
    featured: true,
  },
  {
    id: '10',
    slug: 'rag-for-clinical-guideline-assistants',
    title: 'Retrieval-Augmented Generation for Clinical Guideline Assistants',
    excerpt:
      'Design principles for building RAG systems that answer clinical workflow questions with verifiable references and update-safe architecture.',
    content: `## Abstract

Retrieval-augmented generation (RAG) is a practical architecture for guideline-aware clinical assistants. It improves factual grounding by injecting curated references into the generation context.

## Data Layer

Guideline documents should be chunked with section-aware boundaries and indexed with metadata such as publication year, society source, and recommendation grade.

## Inference Layer

Answer generation should be constrained by retrieved evidence and confidence thresholds. Low-confidence responses must trigger abstention or escalation to human review.

## Monitoring

Production monitoring should track citation coverage, stale-index risk, and answer drift after guideline updates. Shadow evaluation with updated corpora is recommended.

## Conclusion

RAG offers a balanced path between usability and safety in medical decision support. Strong retrieval governance and evidence-first UX are essential for real-world adoption.

## Safety Box

> Clinical assistants should abstain when retrieved evidence is weak, conflicting, or outdated.

## RAG Pipeline Table

| Layer | Core Responsibility | Failure Signal |
|---|---|---|
| Retrieval | Bring high-relevance evidence | Low recall / stale index |
| Re-ranking | Prioritize guideline-quality chunks | Irrelevant top passages |
| Generation | Produce grounded answer | Citation mismatch |
| Guardrails | Enforce safety policy | Missing abstention on low confidence |

## Figure 1: Clinical RAG Flow

> Query -> Retrieval -> Evidence ranking -> Guardrails -> Answer with citations`,
    category: 'Artificial Intelligence',
    author: { name: 'Dr. Ethan Cole', avatar: '', initials: 'EC' },
    readTime: 7,
    views: 13220,
    tags: ['RAG', 'Clinical AI', 'Guidelines', 'Evidence Grounding'],
    publishedAt: '2025-04-02',
    updatedAt: '2025-05-12',
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getArticlesByCategory(category: string): Article[] {
  return ARTICLES.filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  )
}

export function getFeaturedArticles(): Article[] {
  return ARTICLES.filter((a) => a.featured)
}

export function getTrendingArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5)
}

export function getRelatedArticles(article: Article): Article[] {
  return ARTICLES.filter(
    (a) => a.id !== article.id && a.category === article.category
  ).slice(0, 3)
}
