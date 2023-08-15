import '../../globals.css'
import '../../style.scss'
import { validateLanguage } from '../../../utils/helpers'
import AboutView from '../../../components/AboutView'

export default async function Page({ params }) {
    const lang = validateLanguage(params.language) ? params.language : 'en'
    return (
        <>
            <AboutView language={lang}/>
        </>
    )
}
