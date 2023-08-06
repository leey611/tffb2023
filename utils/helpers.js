// an object that stores available HTML language attribute-value
export const htmlLanguages = {
    en: 'en',
    de: 'de',
    tw: 'zh-TW'
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

export const sectionTitles = {
    en: {
        siteTitle: 'Taiwan Film Festival Berlin',
        filmSectionTitle: 'ALL FILMS',
        eventSectionTitle: 'ALL EVENTS',
        sponsorSectionTitle: 'SPONSORS',
        questionSectionTitle: 'FAQ',
        openingFilm: 'Opening Film',
        closingFilm: 'Closing Film',
        aboutUs: 'About Curator Team',
        buyTicket: 'Buy Ticket',
        watchTrailer: 'Trailer',
        bankName: 'Bank Name',
        swiftCode: 'SWIFT Code BIC',
        accountNumber: 'Account Number IBAN',
        accountName: "Account Holder's Name",
        accountAddress: "Account Holder's Address",
        accountTel: "Account Holder's Telephone Number",
        accountEmail: "Account Holder's Email Address",
        backHome: 'Back Home',
    },
    de: {
        siteTitle: 'Taiwan Film Festival Berlin',
        filmSectionTitle: 'ALLE FILME',
        eventSectionTitle: 'ALLE VERANSTALTUNGEN',
        sponsorSectionTitle: 'SPONSOREN & PARTNER',
        questionSectionTitle: 'FAQ',
        openingFilm: 'Eröffnungsfilm',
        closingFilm: 'Schlussfilm',
        aboutUs: 'Über das Kuratorenteam',
        buyTicket: 'Zum Ticketkaufen',
        watchTrailer: 'Trailer',
        bankName: 'Bank Name',
        swiftCode: 'SWIFT Code BIC',
        accountNumber: 'Account Number IBAN',
        accountName: "Account Holder's Name",
        accountAddress: "Account Holder's Address",
        accountTel: "Account Holder's Telephone Number",
        accountEmail: "Account Holder's Email Address",
        backHome: 'Zurück zur Startseite',
    },
    tw: {
        siteTitle: '柏林臺灣影展',
        filmSectionTitle: '所有電影',
        eventSectionTitle: '所有活動',
        sponsorSectionTitle: '贊助商&合作夥伴',
        questionSectionTitle: '常見問題',
        openingFilm: '開幕片',
        closingFilm: '閉幕片',
        aboutUs: '關於策展團隊',
        buyTicket: '購票去',
        watchTrailer: '預告片',
        bankName: '銀行名稱',
        swiftCode: 'SWIFT Code BIC',
        accountNumber: '帳戶號碼 IBAN',
        accountName: "帳戶持有人名稱",
        accountAddress: "帳戶地址",
        accountTel: "帳戶持有人電話號碼",
        accountEmail: "帳戶持有人Email",
        backHome: '回到首頁',
    }
}

