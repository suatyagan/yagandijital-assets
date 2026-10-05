# YAĞAN DİJİTAL GLOBAL PROJE STANDARDI V1

Durum: ONAYLI / ZORUNLU
Kapsam: Mevcut devam eden tüm projeler ve bundan sonra açılacak tüm yeni projeler.
Onay tarihi: 2026-10-05

## Ana yaşam döngüsü

DEMO -> AppDeploy
DEMO SONRASI -> Proje Merkezi'ne Ekle
KOD -> GitHub
VERI / BACKEND -> Supabase (gereken projelerde)
CANLI -> Vercel + Özel Domain
TAKIP -> Proje Merkezi

## Zorunlu kurallar

1. Her site, uygulama veya dijital ürün önce demo aşamasında AppDeploy üzerinde hazırlanabilir.
2. Demo kabul edilebilir seviyeye geldiğinde proje Proje Merkezi'ne kaydedilir.
3. Kaynak kodun ana ve kalıcı kaynağı GitHub'dır. AppDeploy veya Vercel tek kaynak kabul edilmez.
4. Veritabanı, kimlik doğrulama, depolama veya backend ihtiyacı olan projelerde varsayılan merkezi servis Supabase'tir; proje gereksinimine göre istisna ayrıca kayda alınır.
5. Canlı/production sürüm Vercel üzerinde çalışır ve mümkün olduğunda özel domain kullanır.
6. Tüm proje durumu, bağlantılar, kota, lisans, müşteri ve entegrasyon bilgileri Proje Merkezi'nden takip edilir.
7. GitHub, Supabase ve Vercel bağlantıları Proje Merkezi üzerinden proje kaydıyla ilişkilendirilir.
8. Entegrasyon token/secret değerleri düz metin olarak proje ekranlarında gösterilmez; güvenli secret yönetiminde tutulur.
9. Canlıya alma öncesinde GitHub, gerekiyorsa Supabase, Vercel, domain ve Proje Merkezi bağlantıları kontrol edilir.
10. Yeni açılan tüm projeler bu standardı otomatik miras alır. Mevcut projeler kademeli olarak bu standarda uyarlanır.

## Proje Merkezi zorunlu alanları

- Proje adı
- Proje tipi
- Müşteri / marka
- Durum: GELISTIRME | DEMO | QA | CANLI | PASIF
- AppDeploy demo URL / app ID
- GitHub repo / ana branch
- Supabase project ID / bağlantı durumu
- Vercel project ID / production URL
- Özel domain
- Proje Merkezi kayıt ID
- Lisans / paket / süre
- Kota tipi, limit ve kullanım
- Son deploy tarihi
- Son kontrol tarihi
- Entegrasyon sağlık durumu
- Notlar / açık işler

## Canlıya alma kapısı

Aşağıdaki kontroller tamamlanmadan proje CANLI durumuna geçirilmemelidir:

- GitHub repo bağlı ve güncel
- Gerekli ise Supabase bağlı ve migration/schema doğrulanmış
- Vercel production projesi hazır
- Özel domain ve SSL hazır
- Proje Merkezi kaydı tamam
- Gerekli secret/token bağlantıları güvenli şekilde tanımlı
- Son QA başarılı
- Yedek / geri dönüş planı mevcut

## Otomatik Proje Kurulum Protokolü

Yeni bir demo tamamlandıktan sonra varsayılan akış:

AppDeploy Demo
-> Proje Merkezi'ne Ekle
-> GitHub repo oluştur/bağla
-> Supabase gerekiyorsa oluştur/bağla
-> Vercel production oluştur/bağla
-> Özel domain bağla
-> Kota ve lisans takibini aç
-> QA / Kontrol
-> CANLI

## Ürün uygulamaları

Yağan Dijital'in tekrar satılabilen ürünleri Proje Merkezi > Uygulamalar altında ayrıca takip edilir.
Her uygulama için müşteri, lisans, aktivasyon kodu, paket, kota ve kullanım metrikleri izlenebilir.

Örnek ilk uygulamalar:
- Yağan LiveCard
- Dijital Lansman

## Değişiklik yönetimi

Bu standart Yağan Dijital'in global proje kuralıdır.
Bir projede farklı mimari gerekiyorsa istisna proje kaydına gerekçesiyle yazılmalıdır; sessizce standart dışına çıkılmaz.
