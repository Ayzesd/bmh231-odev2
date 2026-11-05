# BMH231 Ödev 2 Rapor Taslağı

## 1. Kapak

**Üniversite:** Yozgat Bozok Üniversitesi  
**Bölüm:** Bilgisayar Mühendisliği  
**Ders:** BMH231 Web Programlama  
**Ödev:** Kampüs Etkinlik Panosu  
**Ad Soyad:** Bedirhan Çiftçi  
**Öğrenci No:** 16008125079  
**Teslim tarihi:** 05.11.2026

## 2. Bölüm A: Kavramsal Sorular

### A1 - Semantik HTML
Semantik etiketler içeriğin anlamını açıkça belirtir. `header`, `nav`, `main`, `section` ve `footer` etiketleri sayfayı tarayıcı ve erişilebilirlik araçları için anlaşılır yapar.

### A2 - CSS özgüllüğü ve kutu modeli
Özgüllük, aynı öğeye uygulanan kurallardan hangisinin öncelikli olacağını belirler. Genel olarak satır içi stil, ID, sınıf ve etiket sırasıyla daha güçlüdür. Kutu modeli içerik, padding, border ve margin bölümlerinden oluşur.

### A3 - Flexbox ve Grid
Flexbox tek yönde hizalama için uygundur; üst bantta ve filtrelerde kullanılmıştır. Grid satır ve sütun düzeni için uygundur; kartlarda `repeat(auto-fit, minmax(240px, 1fr))` kullanılmıştır.

### A4 - JavaScript türleri ve karşılaştırmalar
JavaScript'te string, number, boolean, null, undefined ve object gibi türler vardır. `===` hem değeri hem türü karşılaştırdığı için çoğu durumda `==` yerine tercih edilir.

### A5 - Dizi metotları
`filter` koşula uyan elemanları seçer, `map` her elemanı dönüştürür, `find` ilk uygun elemanı bulur, `forEach` elemanlar üzerinde işlem yapar. Projede `filter`, `find` ve `forEach` kullanılmıştır.

### A6 - DOM ve XSS güvenliği
DOM, JavaScript'in HTML öğelerine erişmesini sağlar. Kullanıcıdan gelen veriyi `innerHTML` ile eklemek XSS riski oluşturabilir. Bu projede kart bilgileri `createElement`, `textContent` ve `append` ile eklenmiştir.

### A7 - JavaScript olay döngüsü
JavaScript senkron kodu çalıştırır; bekleyen ağ işlemleri tamamlanınca Promise ve `async/await` ile devam eder. `fetch` çağrısı bu nedenle sayfayı tamamen durdurmaz.

### A8 - REST ve JSON
REST, kaynaklara HTTP yöntemleri ve URL'ler üzerinden erişim yaklaşımıdır. Bu projede etkinlik kaynağı GET ile okunur. JSON veriyi metin tabanlı ve kolay taşınabilir biçimde tutar.

## 3. Bölüm B: HTML ve CSS

### B1 - Semantik iskelet
`public/index.html` dosyasında `lang="tr"`, UTF-8 charset, viewport, header içindeki logo ve nav, main içindeki etkinlik ve öneri section'ları, tek h1 ve footer bulunur. Her form alanının kendisine bağlı bir label'ı vardır.

Ekran görüntüsü: Buraya 1280px masaüstü görünümü eklenecek.

### B2 - Yerleşim

```css
:root {
  --ana-renk: #1d4ed8;
  --koyu-renk: #172554;
  --kenar: #dbe3ef;
}

* { box-sizing: border-box; }
.site-header, .filtreler { display: flex; }
.etkinlik-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
```

CSS değişkenleri ortak renk ve gölge değerlerini tekrar kullanır. `box-sizing` genişlik hesaplarını kontrol eder. Flexbox üst bant ve filtreleri hizalar. Grid ise kartları ekran genişliğine göre sütunlara yerleştirir.

### B3 - Duyarlı tasarım
600px altındaki ekranlarda header alt alta geçer ve içerik daralır:

```css
@media (max-width: 600px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
```

600px kırılma noktası, telefon ekranlarında üst bantta yatay sıkışmayı önlemek için seçilmiştir.

Eklenecek ekran görüntüleri:

- [ ] Geliştirici araçlarında 1280px görünüm
- [ ] Geliştirici araçlarında 390px görünüm

### B4 - Erişilebilirlik ölçümü
Lighthouse'ta yalnızca Accessibility kategorisi seçilerek ölçüm yapılmalıdır. İlk sonuç ve düzeltme sonrası sonuç bu bölüme eklenmelidir. Form label'ları, `aria-live` durum mesajları ve anlamlı başlıklar erişilebilirliği destekler.

- [ ] İlk Lighthouse ekran görüntüsü
- [ ] Düzeltilen sorun ve açıklaması
- [ ] İkinci Lighthouse ekran görüntüsü

## 4. Bölüm C: JavaScript ve DOM

### C1 - Kartları veriden üretmek
Kartlar API'den gelen veriyle `document.createElement`, `textContent` ve `append` kullanılarak oluşturulur. Veriye dayalı içerik için `innerHTML` kullanılmamıştır. Tarihler `toLocaleDateString("tr-TR")` ile gösterilir.

### C2 - Filtre ve arama
`Tümü`, `Atölye`, `Söyleşi` ve `Topluluk` düğmeleri click olayıyla çalışır. Seçilen düğmeye `secili` sınıfı eklenir. Arama input olayıyla çalışır ve filtre ile aynı anda uygulanır. Her çizim öncesi `replaceChildren()` çağrılır.

Eklenecek üç ekran görüntüsü:

- [ ] Tümü görünümü
- [ ] Atölye filtresi ve `git` araması
- [ ] Sonuç yok mesajı

### C3 - Form doğrulama
Form `preventDefault()` ile durdurulur. Ad en az 5 karakter, tarih boş veya geçmiş değil, e-posta geçerli olmalıdır. Hatalar `textContent` ve `input-hata` sınıfıyla gösterilir; geçerli formda teşekkür mesajı çıkar.

- [ ] Hatalı form ekran görüntüsü
- [ ] Başarılı form ekran görüntüsü

### C4 - Hata ayıklama
Geliştirme sırasında ilk sunucu çalıştırma denemesinde yanlış çalışma klasörü nedeniyle `Cannot find module ... sunucu.js` hatası alındı. Terminal çıktısı incelenerek sorun bulundu ve sunucu proje klasörüne geçildikten sonra çalıştırıldı. Son kontrolde `node --check` ile JavaScript dosyaları doğrulandı.

- [ ] Bu hata için terminal ekran görüntüsü
- [ ] Konsolda hata olmadığını gösteren ekran görüntüsü

## 5. Bölüm D: Asenkron Programlama ve API

### D1 - Sunucu ve JSON API
`sunucu.js` yalnızca `http`, `fs` ve `path` modüllerini kullanır, 3000 portunda çalışır ve her isteğin yöntemi ile yolunu terminale yazar. `/api/etkinlikler` filtrelenebilir, `/api/etkinlikler/3` tek kayıt döndürür. Bulunmayan etkinlik JSON 404, diğer bulunmayan yollar düz metin 404 döndürür. GET dışındaki yöntemler düz metin 405 ve `Allow: GET` başlığı döndürür. Sunucu dosyaları `public` dışında tutulduğu için tarayıcıdan sunulmaz.

Terminal kaydı ve sunucu kodu ekran görüntüsü öğrenci tarafından eklenmelidir.

### D2 - fetch ve async/await
Sayfa açılırken `fetch("/api/etkinlikler")` çağrılır. `async/await`, `response.ok`, `try/catch` ve yükleniyor/hata iletileri kullanılır.

- [ ] Sunucu durdurulmuşken hata mesajı ekran görüntüsü

### D3 - Ağ gözlemi
Network sekmesinde Fetch/XHR filtresi seçilip `/api/etkinlikler` isteğinin Content-Type, durum kodu ve TTFB değerleri yazılmalıdır. Ana HTML TTFB'siyle karşılaştırılmalı; Slow 4G veya 3G altında yükleniyor mesajı görüntülenmelidir.

- [ ] Ölçüm tarihi ve saati
- [ ] API istek/yanıt başlıkları ve TTFB
- [ ] HTML TTFB karşılaştırması
- [ ] Slow 4G yükleniyor ekran görüntüsü

Gerçek ölçüm değerleri üretilmemiştir; tarayıcıda öğrenci tarafından ölçülmelidir.

### D4 - curl ile API testi

```bash
curl -i "http://localhost:3000/api/etkinlikler?tur=atolye"
curl -i http://localhost:3000/api/etkinlikler/2
curl -i http://localhost:3000/api/etkinlikler/999
curl -i -X DELETE http://localhost:3000/api/etkinlikler/2
```

Bu komutların gerçek terminal çıktıları rapora eklenmelidir.

## 6. Bölüm E: GitHub ve README

Kurulum, `git clone`, `npm start`, API uç noktaları ve ekran görüntüsü bölümü [README.md](./README.md) dosyasında bulunmaktadır. Gerçek GitHub deposu ve commit geçmişi öğrenci tarafından oluşturulmalıdır.

## 7. Kaynaklar

- MDN Web Docs: HTML, CSS, JavaScript ve Fetch API
- Node.js Documentation: HTTP, FS ve Path modülleri
- BMH231 Ödev 2 PDF'i

## 8. Yapay Zekâ Kullanım Beyanı

Bu proje hazırlanırken yapay zekâ desteğinden yararlanılmıştır. Kodlar öğrenci tarafından incelenmeli, anlaşılmalı ve test edilmelidir. Gerçek ekran görüntüleri, Network/Lighthouse ölçümleri, curl çıktıları, Git commitleri ve GitHub işlemleri öğrenci tarafından oluşturulmalıdır.
