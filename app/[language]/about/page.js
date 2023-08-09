import '../../globals.css'
import '../../style.scss'
import Scaffold from '../../../components/Scaffolding'
import { validateLanguage, isEmpty, sectionTitles } from '../../../utils/helpers'
import SectionTitle from '../../../components/SectionTitle'
import SocialHandle from '../../../components/SocialHandle'
import Marquee from '../../../components/Marquee'

import Link from 'next/link'
import Team from '../../../components/Team'
import SpecialTitle from '../../../components/SpecialTitle'
import LanguageSelect from '../../../components/LanguageSelect'
import BackHome from '../../../components/BackHome'
import Footer from '../../../components/Footer'

// Font files can be colocated inside of `pages`
// const myFont = localFont({ src: '../../fonts/terminal-grotesque-webfont.woff2' })

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

export default async function Page({ params }) {
    const lang = validateLanguage(params.language) ? params.language : 'en'
    const others = await getOthers()
    const marquee = others.filter(data => data.fields['Type'] === 'Donate-Float').map(marquee => marquee.fields[`Title_${lang}`]).join('');
    const team = others.filter(data => data.fields['Type'] === 'Team')
    const websiteGlobal = others.filter(data => data.fields['Type'] === 'Website')[0]

    return (
        <>

            <LanguageSelect link={['/about', '/de/about', '/tw/about']} />

            <Marquee content={marquee} link={`/${lang}/donate`}></Marquee>

            <section className="max-w-1440 mx-auto px-[5vw]">

                <BackHome link={`/${lang}`} language={lang}/>
                <h1 className='text-center text-h1 font-special text-primary'>{sectionTitles[lang].aboutUs}</h1>
                <img src='../img/about-img.png' className='block w-20 md:w-36 mx-auto my-24'/>
                <Team team={team} language={lang} />
                <Footer language={lang}/>
            </section>

        </>
    )
}
