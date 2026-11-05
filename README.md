# BMH231 Ödev 2: Kampüs Etkinlik Panosu

Bu proje, Yozgat Bozok Üniversitesi kampüsündeki etkinlikleri listeleyen, arama ve tür filtreleme yapan basit bir web uygulamasıdır.

## Kullanılan teknolojiler

HTML5, CSS3, Vanilla JavaScript, Node.js'in `http`, `fs` ve `path` modülleri, JSON ve Fetch API kullanılmıştır. Express veya bir CSS/JavaScript kütüphanesi kullanılmamıştır.

## Kurulum ve çalıştırma

```bash
git clone REPO_ADRESINIZ
cd bmh231-odev2
npm start
```

Tarayıcıdan `http://localhost:3000` adresini açın. GitHub deposunu öğrenci oluşturup adresi `REPO_ADRESINIZ` yerine yazmalıdır.

## API uç noktaları

| Yöntem | Uç nokta | Açıklama |
|---|---|---|
| GET | `/api/etkinlikler` | Bütün etkinlikleri getirir |
| GET | `/api/etkinlikler?tur=atolye` | Atölyeleri getirir |
| GET | `/api/etkinlikler/2` | ID'si 2 olan etkinliği getirir |

DELETE isteği desteklenmez ve `405` ile `Allow: GET` başlığı döner.

## Ekran görüntüleri

Rapor için uygulamanın masaüstü ve mobil ekran görüntüleri buraya eklenmelidir.

## Git işlemleri

Gerçek commit geçmişi oluşturulmamıştır. Öğrenci, anlamlı değişiklikleri en az 10 commit halinde ve en az iki farklı günde kendisi commit etmelidir. GitHub'a gönderme işlemini de kendisi yapmalıdır.
