import '../../globals.css'
import '../../style.scss'
import { validateLanguage } from '../../../utils/helpers'
import DonateView from '../../../components/DonateView'

export default async function Page({ params }) {
    const lang = validateLanguage(params.language) ? params.language : 'en'

    return (
        <>
            <DonateView language={lang}/>
        </>
    )
}
