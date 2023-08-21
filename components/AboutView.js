import BackHome from "./BackHome";
import Footer from "./Footer";
import LanguageSelect from "./LanguageSelect";
import Marquee from "./Marquee";
import Team from "./Team";
import { sectionTitles } from "../utils/helpers";

const airtableApiKey = process.env.AIRTABLE_API_KEY
const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableTableOthersId = process.env.AIRTABLE_TABLE_OTHERS_ID
const airtableTableOthersViewId = process.env.AIRTABLE_TABLE_OTHERS_VIEW_ID

async function getOthers() {
    try {
        const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableOthersId}?view=${airtableTableOthersViewId}`, {
            headers: {
                Authorization: `Bearer ${airtableApiKey}`,
            },
            cache: 'no-store'
        });
        const data = await res.json();
        return data.records
    } catch (error) {
        console.log(error);
    }
}

export default async function AboutView({ language }) {
    const others = await getOthers()
    const marquee = others.filter(data => data.fields['Type'] === 'Donate-Float').map(marquee => marquee.fields[`Title_${language}`]).join('');
    const team = others.filter(data => data.fields['Type'] === 'Team')
    const websiteGlobal = others.filter(data => data.fields['Type'] === 'Website')[0]
    const { GoogleCalendarUrl } = websiteGlobal.fields
    const sectionText = sectionTitles[language] 
    return (
        <>
            <LanguageSelect link={['/about', '/de/about', '/tw/about']} />
            <Marquee content={marquee} link={`/${language}/donate`} />
            <section className="max-w-1440 mx-auto px-[5vw]">
                <BackHome link={`/${language}`} language={language} />
                <h1 className='text-center text-h1 font-special text-primary'>{sectionText.aboutUs}</h1>
                <img src='../img/about-img.png' className='block w-20 md:w-36 mx-auto my-24'/>
                <Team team={team} language={language} />
                <Footer language={language} googleCalendar={GoogleCalendarUrl}/>
            </section>
        </>
    )
}