import BackHome from "./BackHome";
import Footer from "./Footer";
import LanguageSelect from "./LanguageSelect";
import dynamic from 'next/dynamic'

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

export default async function DonateView({ language }) {
    const CopyBank = dynamic(() => import("./Bank"), { ssr: false })
    const others = await getOthers()
    const donate = others.filter(data => data.fields['Type'] === 'Donate-Info')
    return(
        <>
            <LanguageSelect link={['/donate', '/de/donate', '/tw/donate']} />
            <section className="max-w-1440 mx-auto px-[5vw]">
                <BackHome link={`/${language}`} language={language} />
                <CopyBank bank={donate[0]} language={language} />
                <Footer language={language} />
            </section>
        </>
    )
}