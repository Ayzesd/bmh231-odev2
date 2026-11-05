const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const projeKlasoru = __dirname;
const publicKlasoru = path.join(projeKlasoru, "public");
const veriDosyasi = path.join(projeKlasoru, "etkinlikler.json");

function jsonGonder(res, durumKodu, veri) {
  res.writeHead(durumKodu, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(veri));
}

function etkinlikleriOku() {
  return JSON.parse(fs.readFileSync(veriDosyasi, "utf8"));
}

function dosyaGonder(res, dosyaYolu) {
  const uzanti = path.extname(dosyaYolu);
  const icerikTipleri = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8"
  };
  const icerikTipi = icerikTipleri[uzanti];

  if (!icerikTipi) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Dosya bulunamadı.");
    return;
  }

  fs.readFile(dosyaYolu, (hata, veri) => {
    if (hata) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Dosya bulunamadı.");
      return;
    }
    res.writeHead(200, { "Content-Type": icerikTipi });
    res.end(veri);
  });
}

const sunucu = http.createServer((req, res) => {
  const istekUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  console.log(`${req.method} ${istekUrl.pathname}`);

  if (req.method !== "GET") {
    res.writeHead(405, {
      "Allow": "GET",
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end("Yalnızca GET yöntemi destekleniyor.");
    return;
  }

  if (istekUrl.pathname === "/api/etkinlikler") {
    let etkinlikler = etkinlikleriOku();
    const tur = istekUrl.searchParams.get("tur");
    if (tur) {
      etkinlikler = etkinlikler.filter((etkinlik) => etkinlik.tur === tur);
    }
    jsonGonder(res, 200, etkinlikler);
    return;
  }

  const etkinlikEslestirmesi = istekUrl.pathname.match(/^\/api\/etkinlikler\/(\d+)$/);
  if (etkinlikEslestirmesi) {
    const id = Number(etkinlikEslestirmesi[1]);
    const etkinlik = etkinlikleriOku().find((kayit) => kayit.id === id);
    if (!etkinlik) {
      jsonGonder(res, 404, { hata: "Etkinlik bulunamadı." });
      return;
    }
    jsonGonder(res, 200, etkinlik);
    return;
  }

  if (istekUrl.pathname === "/" || istekUrl.pathname === "/index.html") {
    dosyaGonder(res, path.join(publicKlasoru, "index.html"));
    return;
  }

  if (istekUrl.pathname.startsWith("/api/")) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Sayfa bulunamadı.");
    return;
  }

  const dosyaAdi = path.basename(istekUrl.pathname);
  const dosyaYolu = path.resolve(publicKlasoru, dosyaAdi);
  if (dosyaYolu.startsWith(publicKlasoru + path.sep)) {
    dosyaGonder(res, dosyaYolu);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Sayfa bulunamadı.");
});

sunucu.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
