import '../globals.css'
import { validateLanguage, sectionTitles } from '../../utils/helpers'

export async function generateMetadata({ params }) {
  const languageRoute = validateLanguage(params.language) ? params.language : 'en'
  const title = sectionTitles[languageRoute].aboutUs
  return {
    title,
  }
}

export default function RootLayout({ children, params }) {

    return (
        // children
        <html >
          <body>{children}</body>
        </html>
    )
}
