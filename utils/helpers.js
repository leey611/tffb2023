// an object that stores available HTML language attribute-value
export const htmlLanguages = {
    en: 'en',
    de: 'de',
    tw: 'zh-TW'
}

export const paramToHtmlLang = (param) => {
    if (!param) return htmlLanguages['en']
    return htmlLanguages[param]
}

export const validateLanguage = (param) => {
    return htmlLanguages[param]
}

export const formatDate = (date, options) =>
    date.toLocaleString("en-GB", { timeZone: "Europe/Berlin", ...options });

export const formatBerlinTime = (time) => {
    const dateObj = new Date(time)
    const year = formatDate(dateObj, { year: "numeric" });
    const month = formatDate(dateObj, { month: "2-digit" });
    const day = formatDate(dateObj, { day: "2-digit" });
    const hour = formatDate(dateObj, { hour: "2-digit" });
    const minute = formatDate(dateObj, { minute: "2-digit" }).padStart(2, "0");
    return { year, month, day, hour, minute }
}

export const isEmpty = (obj) => Object.keys(obj).length === 0

export const convertToEmbedURL = (originalURL) => {
    // Regular expression pattern to match the video ID from the original URL
    const videoIDPattern = /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/;
  
    // Check if the input URL is already an embed URL
    if (originalURL.includes("youtube.com/embed/")) {
      return originalURL;
    }
  
    // Match the video ID from the original URL using the regex pattern
    const match = originalURL.match(videoIDPattern);
  
    if (match && match[1]) {
      // If a match is found, construct the embed URL with the video ID
      const embedURL = `https://www.youtube.com/embed/${match[1]}`;
      return embedURL;
    } else {
      // Return null if the original URL is not a valid YouTube video URL
      return null;
    }
}

export const metaKeywords = ['Berlin', 'film', 'festival', 'film festival', 'Taiwan', 'Taiwan Film Festival Berlin', '柏林', '臺灣', '台灣', '柏林臺灣影展', '柏林台灣影展', '影展', 'Impression Taiwan', 'Impression Taiwan e.V.', 'Impression Taiwan Association', '映像臺灣協會', '映像台灣協會', '家', 'Home', 'ZuHause']

export const sectionTitles = {
    en: {
        siteTitle: '6th Taiwan Film Festival Berlin',
        description: 'Home, Wherever',
        aboutSectionTitle: 'ABOUT THIS YEAR',
        filmSectionTitle: 'ALL FILMS',
        eventSectionTitle: 'ALL EVENTS',
        sponsorSectionTitle: 'SPONSORS',
        partnerSectionTitle: 'PARTNERS',
        questionSectionTitle: 'FAQ',
        openingFilm: 'Opening Film',
        closingFilm: 'Closing Film',
        aboutUs: 'About Curator Team',
        donate: 'Donate to support us',
        buyTicket: 'Buy Ticket',
        watchTrailer: 'Trailer',
        bankName: 'Bank Name',
        swiftCode: 'SWIFT Code BIC',
        accountNumber: 'IBAN',
        accountName: "Account Holder's Name",
        accountAddress: "Account Holder's Address",
        accountTel: "Account Holder's Telephone Number",
        accountEmail: "Account Holder's Email Address",
        backHome: 'Back Home',
    },
    de: {
        siteTitle: '6th Taiwan Film Festival Berlin',
        description: 'Zuhause, Wo Auch Immer',
        aboutSectionTitle: 'ÜBER DIESES JAHR',
        filmSectionTitle: 'ALLE FILME',
        eventSectionTitle: 'ALLE VERANSTALTUNGEN',
        sponsorSectionTitle: 'SPONSOREN & PARTNER',
        partnerSectionTitle: 'PARTNER',
        questionSectionTitle: 'FAQ',
        openingFilm: 'Eröffnungsfilm',
        closingFilm: 'Schlussfilm',
        aboutUs: 'Über das Kuratorenteam',
        donate: 'Spenden, um uns zu unterstützen',
        buyTicket: 'Zum Ticketkaufen',
        watchTrailer: 'Trailer',
        bankName: 'Bank Name',
        swiftCode: 'SWIFT Code BIC',
        accountNumber: 'IBAN',
        accountName: "Name Kontoinhaber",
        accountAddress: "Adresse Kontoinhaber",
        accountTel: "Telefonnummer Kontoinhaber",
        accountEmail: "E-Mail Adresse Kontoinhaber",
        backHome: 'Zurück zur Startseite',
    },
    tw: {
        siteTitle: '第六屆柏林臺灣影展',
        description: '家，在四方',
        aboutSectionTitle: '關於今年',
        filmSectionTitle: '所有電影',
        eventSectionTitle: '所有活動',
        sponsorSectionTitle: '贊助商',
        partnerSectionTitle: '合作夥伴',
        questionSectionTitle: '常見問題',
        openingFilm: '開幕片',
        closingFilm: '閉幕片',
        aboutUs: '關於策展團隊',
        donate: '捐贈',
        buyTicket: '購票去',
        watchTrailer: '預告片',
        bankName: '銀行名稱',
        swiftCode: 'SWIFT Code BIC',
        accountNumber: 'IBAN',
        accountName: "帳戶持有人名稱",
        accountAddress: "帳戶地址",
        accountTel: "帳戶持有人電話號碼",
        accountEmail: "帳戶持有人電子信箱",
        backHome: '回到首頁',
    }
}

