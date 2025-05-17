// renderer.js
document.addEventListener("DOMContentLoaded", async () => {
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
      { name: "HSBC UK", url: "https://www.hsbc.co.uk/security" },
      {
        name: "Lloyds Bank UK",
        url: "https://online.lloydsbank.co.uk/personal/logon/login.jsp",
        country: "United Kingdom",
      },
      {
        name: "Barclays UK",
        url: "https://bank.barclays.co.uk/olb/authlogin/loginAppContainer.do",
        country: "United Kingdom",
      },
      {
        name: "nationwide UK",
        url: "https://onlinebanking.nationwide.co.uk/AccessManagement/IdentifyCustomer/IdentifyCustomer",
        country: "United Kingdom",
      },
      {
        name: "The co-operative Bank UK",
        url: "https://bank.co-operativebank.co.uk/r/Login/EnterUsername",
        country: "United Kingdom",
      },
      {
        name: "TSB Bank UK",
        url: "https://internetbanking.tsb.co.uk/personal/logon/login/#/login",
        country: "United Kingdom",
      },
      {
        name: "First Direct UK",
        url: "https://www.firstdirect.com/security",
        country: "United Kingdom",
      },
      {
        name: "Natwest UK",
        url: "https://www.onlinebanking.natwest.com/Default.aspx",
        country: "United Kingdom",
      },
      {
        name: "Deutsche Bank DE",
        url: "https://meine.deutsche-bank.de/trxm/db/init.do",
        country: "Germany",
      },
      {
        name: "Jetonbank",
        url: "https://portal.jetonbank.com/login",
        country: "Global",
      },
      {
        name: "HSBC Türkiye",
        url: "https://internet.hsbc.com.tr/UIApplication/internet.aspx?lang=TR",
        country: "Turkiye",
      },
      {
        name: "ICBC Turkey",
        url: "https://teksweb.icbc.com.tr/teksweb/internet_project_jsp_html/logon.jsp?fa=A&lngCode=tr",
        country: "Turkiye",
      },
      {
        name: "Enpara.com",
        url: "https://internetsubesi.enpara.com/Login/LoginPage.aspx",
        country: "Turkiye",
      },
      {
        name: "Aktif Bank (N Kolay)",
        url: "https://online.aktifbank.com.tr/default.aspx?lang=tr-TR",
        country: "Turkiye",
      },
      {
        name: "Dünya Katılım",
        url: "https://internetsube.dunyakatilim.com.tr/login",
        country: "Turkiye",
      },
      {
        name: "Destekbank",
        url: "https://isube.destekbank.com/Login/InitialLogin",
        country: "Turkiye",
      },
      {
        name: "Türkiye Finans",
        url: "https://internetsube.turkiyefinans.com.tr/Login/LoginStepOne?l=tr&c=0",
        country: "Turkiye",
      },
      {
        name: "Alternatif Bank",
        url: "https://online.alternatifbank.com.tr/Login/FirstLevel",
        country: "Turkiye",
      },
      {
        name: "Albaraka Türk",
        url: "https://esube.albaraka.com.tr/",
        country: "Turkiye",
      },
      {
        name: "Anadolubank",
        url: "https://isube.anadolubank.com.tr/ibank/?loginPage=b",
        country: "Turkiye",
      },
      {
        name: "Şekerbank",
        url: "https://sube.sekerbank.com.tr/login",
        country: "Turkiye",
      },
      {
        name: "Odeabank Bireysel",
        url: "https://onlineodeabireysel.odeabank.com.tr/login",
        country: "Turkiye",
      },
      {
        name: "Garanti BBVA",
        url: "https://sube.garantibbva.com.tr/isube/login/login/passwordentrypersonal-tr",
        country: "Turkiye",
      },
      {
        name: "Yapı Kredi",
        url: "https://internetsube.yapikredi.com.tr/ngi/index.do",
        country: "Turkiye",
      },
      {
        name: "Fibabanka",
        url: "https://internetbankaciligi.fibabanka.com.tr/",
        country: "Turkiye",
      },
      {
        name: "DenizBank",
        url: "https://acikdeniz.denizbank.com/",
        country: "Turkiye",
      },
    ],
    emi: [
      {
        name: "Revolut",
        url: "https://app.revolut.com/login",
        country: "Global",
      },
      {
        name: "Payoneer",
        url: "https://login.payoneer.com/",
        country: "Global",
      },
      { name: "N26", url: "https://app.n26.com/login", country: "Global" },
      {
        name: "Stripe",
        url: "https://dashboard.stripe.com/login",
        country: "Global",
      },
      {
        name: "Stripe Express",
        url: "https://connect.stripe.com/express_login",
        country: "Global",
      },

      {
        name: "Papel Türkiye",
        url: "https://mywallet.papel.com.tr/login",
        country: "Turkiye",
      },
      {
        name: "Papara",
        url: "https://www.papara.com/personal/auth/login/email-phone",
        country: "Turkiye",
      },
      {
        name: "Tami",
        url: "https://portal.tami.com.tr/",
        country: "Turkiye",
      },
    ],
    gold: [
      {
        name: "Kitco",
        url: "https://www.kitco.com/charts/gold",
        country: "Global",
      },
      {
        name: "Metals Daily",
        url: "https://www.metalsdaily.com/live-prices/gold/",
        country: "Global",
      },
      {
        name: "İZKO",
        url: "https://www.izko.org.tr/Home/GuncelKur",
        country: "Turkiye",
      },
      {
        name: "Harem Altın",
        url: "https://canlipiyasalar.haremaltin.com/",
        country: "Turkiye",
      },
      {
        name: "Altınkaynak",
        url: "https://www.altinkaynak.com/canli-kurlar/",
        country: "Turkiye",
      },
    ],
    stocks: [
      {
        name: "Interactive Brokers",
        url: "https://www.interactivebrokers.co.uk/sso/Login",
        country: "United Kingdom",
      },
    ],
    crypto: [
      {
        name: "Binance",
        url: "https://www.binance.com/en/login",
        country: "Global",
      },
      {
        name: "Binance TR",
        url: "https://www.binance.tr/account/signin",
        country: "Turkiye",
      },
      {
        name: "Binance TH",
        url: "https://accounts.binance.th/en/login",
        country: "Thailand",
      },
      {
        name: "Coinbase",
        url: "https://login.coinbase.com/signin",
        country: "Global",
      },
      {
        name: "Bitstamp",
        url: "https://www.bitstamp.net/onboarding/login/",
        country: "Global",
      },
      {
        name: "KuCoin",
        url: "https://www.kucoin.com/ucenter/signin",
        country: "Global",
      },
      { name: "HTX", url: "https://www.htx.com/login", country: "Global" },
      {
        name: "Bittrex",
        url: "https://bittrex.com/account/login",
        country: "Global",
      },
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

  function filterAndPopulateLists(countryFilter) {
    const filteredSites = {};

    for (const category in sites) {
      filteredSites[category] = sites[category].filter((site) => {
        return (
          countryFilter === "All" ||
          (site.country &&
            site.country.toLowerCase() === countryFilter.toLowerCase())
        );
      });
    }

    ["banks", "emi", "gold", "stocks", "crypto"].forEach((key) => {
      const listId = `${key}-list`;
      const listElement = document.getElementById(listId);
      if (listElement) {
        listElement.innerHTML = "";
        filteredSites[key].forEach((site) => {
          listElement.appendChild(createSiteButton(site));
        });
      }
    });
  }

  const countrySelect = document.getElementById("countryFilter");
  countrySelect.addEventListener("change", () => {
    filterAndPopulateLists(countrySelect.value);
  });

  populateList("banks-list", sites.banks);
  populateList("emi-list", sites.emi);
  populateList("gold-list", sites.gold);
  populateList("stocks-list", sites.stocks);
  populateList("crypto-list", sites.crypto);
});
