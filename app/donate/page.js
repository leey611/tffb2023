import '../globals.css'
import '../style.scss'
import Scaffold from '../../components/Scaffolding'
import BackHome from '../../components/BackHome'
import { isEmpty, sectionTitles } from '../../utils/helpers'
import SectionTitle from '../../components/SectionTitle'
import SocialHandle from '../../components/SocialHandle'
import Link from 'next/link'
import dynamic from "next/dynamic"
import Bank from '../../components/Bank'
import Footer from '../../components/Footer'
import LanguageSelect from '../../components/LanguageSelect'

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

export default async function Page() {
    const others = await getOthers()
    const donate = others.filter(data => data.fields['Type'] === 'Donate-Info')
    const websiteGlobal = others.filter(data => data.fields['Type'] === 'Website')[0]
    const CopyBank = dynamic(() => import("../../components/Bank"), { ssr: false })

    return (
        <>
            <LanguageSelect link={['/donate', '/de/donate', '/tw/donate']}/>
            <section className="max-w-1440 mx-auto px-[5vw]">
                <BackHome link={`/`} language={'en'}/>        
                <CopyBank bank={donate[0]} language={'en'}/>
                <Footer language={'en'}/>   
            </section>
        </>
    )
}
