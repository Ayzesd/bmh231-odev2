let etkinlikler = [];
let seciliTur = "tumu";

const liste = document.querySelector("#etkinlik-listesi");
const durum = document.querySelector("#durum");
const arama = document.querySelector("#arama");

const turAdlari = {
  atolye: "Atölye",
  soylesi: "Söyleşi",
  topluluk: "Topluluk"
};

function tarihGoster(tarih) {
  return new Date(`${tarih}T00:00:00`).toLocaleDateString("tr-TR");
}

function kartOlustur(etkinlik) {
  const kart = document.createElement("article");
  kart.className = "kart";

  const tur = document.createElement("span");
  tur.className = "tur";
  tur.textContent = turAdlari[etkinlik.tur] || etkinlik.tur;

  const baslik = document.createElement("h3");
  baslik.textContent = etkinlik.baslik;

  const tarih = document.createElement("p");
  tarih.textContent = `Tarih: ${tarihGoster(etkinlik.tarih)}`;

  const yer = document.createElement("p");
  yer.textContent = `Yer: ${etkinlik.yer}`;

  const kontenjan = document.createElement("p");
  kontenjan.textContent = `Kontenjan: ${etkinlik.kontenjan} kişi`;

  kart.append(tur, baslik, tarih, yer, kontenjan);
  return kart;
}

function etkinlikleriCiz() {
  const aramaMetni = arama.value.trim().toLocaleLowerCase("tr-TR");
  liste.replaceChildren();

  const uygunEtkinlikler = etkinlikler.filter((etkinlik) => {
    const turUygun = seciliTur === "tumu" || etkinlik.tur === seciliTur;
    const aranabilirMetin = `${etkinlik.baslik} ${etkinlik.yer} ${turAdlari[etkinlik.tur]}`
      .toLocaleLowerCase("tr-TR");
    return turUygun && aranabilirMetin.includes(aramaMetni);
  });

  if (uygunEtkinlikler.length === 0) {
    durum.textContent = "Aramanıza uygun etkinlik yok.";
    return;
  }

  durum.textContent = `${uygunEtkinlikler.length} etkinlik gösteriliyor.`;
  uygunEtkinlikler.forEach((etkinlik) => {
    liste.append(kartOlustur(etkinlik));
  });
}

async function etkinlikleriGetir() {
  durum.textContent = "Etkinlikler yükleniyor...";
  try {
    const cevap = await fetch("/api/etkinlikler");
    if (!cevap.ok) {
      throw new Error("Etkinlikler alınamadı.");
    }
    etkinlikler = await cevap.json();
    etkinlikleriCiz();
  } catch (hata) {
    durum.textContent = "Etkinlikler yüklenirken bir hata oluştu.";
    console.error(hata);
  }
}

document.querySelectorAll(".filtre").forEach((buton) => {
  buton.addEventListener("click", () => {
    seciliTur = buton.dataset.tur;
    document.querySelectorAll(".filtre").forEach((filtre) => filtre.classList.remove("secili"));
    buton.classList.add("secili");
    etkinlikleriCiz();
  });
});

arama.addEventListener("input", etkinlikleriCiz);

const form = document.querySelector("#etkinlik-form");
const alanlar = {
  ad: document.querySelector("#etkinlik-adi"),
  tarih: document.querySelector("#etkinlik-tarihi"),
  eposta: document.querySelector("#eposta")
};

function hataGoster(alan, mesaj) {
  alan.classList.add("input-hata");
  document.querySelector(`#${alan.id}-hata`).textContent = mesaj;
}

function hatalariTemizle() {
  Object.values(alanlar).forEach((alan) => {
    alan.classList.remove("input-hata");
    document.querySelector(`#${alan.id}-hata`).textContent = "";
  });
  document.querySelector("#form-mesaji").textContent = "";
}

form.addEventListener("submit", (olay) => {
  olay.preventDefault();
  hatalariTemizle();
  let gecerli = true;
  const bugun = new Date();
  bugun.setHours(0, 0, 0, 0);

  if (alanlar.ad.value.trim().length < 5) {
    hataGoster(alanlar.ad, "Etkinlik adı en az 5 karakter olmalıdır.");
    gecerli = false;
  }
  if (!alanlar.tarih.value) {
    hataGoster(alanlar.tarih, "Tarih boş bırakılamaz.");
    gecerli = false;
  } else if (new Date(`${alanlar.tarih.value}T00:00:00`) < bugun) {
    hataGoster(alanlar.tarih, "Geçmiş bir tarih seçilemez.");
    gecerli = false;
  }
  if (!alanlar.eposta.validity.valid || !alanlar.eposta.value) {
    hataGoster(alanlar.eposta, "Geçerli bir e-posta adresi yazınız.");
    gecerli = false;
  }

  if (gecerli) {
    document.querySelector("#form-mesaji").textContent =
      "Teşekkürler! Etkinlik öneriniz alındı.";
    form.reset();
  }
});

etkinlikleriGetir();
