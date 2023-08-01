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
    const marquee = others.filter(data => data.fields['Type'] === 'Donate-Float').map(marquee => marquee.fields[`Title_${'en'}`]).join('');
    const donate = others.filter(data => data.fields['Type'] === 'Donate-Info')
    const websiteGlobal = others.filter(data => data.fields['Type'] === 'Website')[0]
    const CopyBank = dynamic(() => import("../../components/Bank"), { ssr: false })

    return (
        <Scaffold lang="en">
            <section className="max-w-1440 mx-auto px-[5vw]">
            <BackHome link={`/`} language={'en'}/>
                
                <CopyBank bank={donate[0]} language={'en'}/>
               
                <div className="w-full flex flex-col gap-10 items-center my-[10rem]">
                    <div className="w-[200px]">
                        <img src="https://www.dropbox.com/scl/fi/qn9ac4ua1gtrplvbhh27h/IMTW_LOGO_-05.png?rlkey=j0ky1zca3mg4tdmfp9mawb92v&raw=1" />
                    </div>
                    <div>
                        <Link href=""><button className="border-2 border-secondary py-3 px-5 rounded-full text-h4 font-special font-medium">{sectionTitles['en'].aboutUs}</button>
                        </Link>
                    </div>
                    <div className="flex gap-5">
                        <SocialHandle logo="img/social_fb.svg" link="https://www.facebook.com/ImpressionTaiwan/" />
                        <SocialHandle logo="img/social_ig.svg" link="https://www.instagram.com/impressiontaiwan/" />
                    </div>
                </div>
            </section>

        </Scaffold>
    )
}