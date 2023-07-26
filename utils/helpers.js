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
    return  { year, month, day, hour, minute }
}

export const isEmpty = (obj) => Object.keys(obj).length === 0

export const sectionTitles = {
    en: {
        filmSectionTitle: 'ALL FILMS',
        eventSectionTitle: 'ALL EVENTS',
        sponsorSectionTitle: 'SPONSORED BY',
        questionSectionTitle: 'FAQ',
        openingFilm: 'Opening Film',
        closingFilm: 'Closing Film',
        aboutUs: 'About Us',
    },
    de: {
        filmSectionTitle: 'ALL FILME',
        eventSectionTitle: 'ALLE VERANSTALTUNGEN',
        sponsorSectionTitle: 'GESPONSERT VON',
        questionSectionTitle: 'FAQ',
        openingFilm: 'Eröffnungsfilm',
        closingFilm: 'Schlussfilm',
        aboutUs: 'Über uns',
    }, 
    tw: {
        filmSectionTitle: '所有電影',
        eventSectionTitle: '所有活動',
        sponsorSectionTitle: '贊助商',
        questionSectionTitle: '常見問題',
        openingFilm: '開幕片',
        closingFilm: '閉幕片',
        aboutUs: '關於我們',
    }
}

          