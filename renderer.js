// renderer.js
document.addEventListener("DOMContentLoaded", () => {
  if (window.electronAPI) {
    console.log(
      "[Renderer] window.electronAPI loaded successfully! (preload.js)",
      window.electronAPI
    );
  } else {
    console.error(
      "[Renderer] ERROR: window.electronAPI not found! (preload.js)"
    );
  }

  const sites = {
    banks: [
      {
        name: "HSBC Türkiye",
        url: "https://internet.hsbc.com.tr/UIApplication/internet.aspx?lang=TR",
      },
      {
        name: "ICBC Turkey",
        url: "https://teksweb.icbc.com.tr/teksweb/internet_project_jsp_html/logon.jsp?fa=A&lngCode=tr",
      },
      {
        name: "Enpara.com",
        url: "https://internetsubesi.enpara.com/Login/LoginPage.aspx",
      },
      {
        name: "Aktif Bank (N Kolay)",
        url: "https://online.aktifbank.com.tr/default.aspx?lang=tr-TR",
      },
      {
        name: "Dünya Katılım",
        url: "https://internetsube.dunyakatilim.com.tr/login",
      },
      {
        name: "Destekbank",
        url: "https://isube.destekbank.com/Login/InitialLogin",
      },
      {
        name: "Türkiye Finans",
        url: "https://internetsube.turkiyefinans.com.tr/Login/LoginStepOne?l=tr&c=0",
      },
      {
        name: "Alternatif Bank",
        url: "https://online.alternatifbank.com.tr/Login/FirstLevel",
      },
      { name: "Albaraka Türk", url: "https://esube.albaraka.com.tr/" },
      {
        name: "Anadolubank",
        url: "https://isube.anadolubank.com.tr/ibank/?loginPage=b",
      },
      { name: "Şekerbank", url: "https://sube.sekerbank.com.tr/login" },
      {
        name: "Odeabank Bireysel",
        url: "https://onlineodeabireysel.odeabank.com.tr/login",
      },
      {
        name: "Garanti BBVA",
        url: "https://sube.garantibbva.com.tr/isube/login/login/passwordentrypersonal-tr",
      },
      {
        name: "Yapı Kredi",
        url: "https://internetsube.yapikredi.com.tr/ngi/index.do",
      },
      {
        name: "Fibabanka",
        url: "https://internetbankaciligi.fibabanka.com.tr/",
      },
      {
        name: "DenizBank",
        url: "https://acikdeniz.denizbank.com/",
      },
    ],
    emi: [
      { name: "Papel Türkiye", url: "https://mywallet.papel.com.tr/login" },
      {
        name: "Papara",
        url: "https://www.papara.com/personal/auth/login/email-phone",
      },
      {
        name: "Tami",
        url: "https://portal.tami.com.tr/",
      },
    ],
    gold: [
      {
        name: "İZKO Güncel Kur",
        url: "https://www.izko.org.tr/Home/GuncelKur",
      },
      { name: "Harem Altın", url: "https://canlipiyasalar.haremaltin.com/" },
      { name: "Altınkaynak", url: "https://www.altinkaynak.com/canli-kurlar/" },
      { name: "Odacı", url: "https://odaci.com/" },
    ],
  };

  function createSiteButton(item) {
    const button = document.createElement("button");
    button.textContent = item.name;
    button.className = "site-button";
    button.addEventListener("click", () => {
      if (
        window.electronAPI &&
        typeof window.electronAPI.sendLoadUrl === "function"
      ) {
        window.electronAPI.sendLoadUrl(item.url);
      }
    });
    const listItem = document.createElement("li");
    listItem.appendChild(button);
    return listItem;
  }

  function populateList(listId, items) {
    const listElement = document.getElementById(listId);
    if (listElement) {
      items.forEach((item) => {
        listElement.appendChild(createSiteButton(item));
      });
    }
  }

  populateList("banks-list", sites.banks);
  populateList("emi-list", sites.emi);
  populateList("gold-list", sites.gold);
});
