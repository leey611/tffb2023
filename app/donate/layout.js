import '../globals.css'
import { validateLanguage, sectionTitles } from '../../utils/helpers'

export async function generateMetadata({ params }) {
  const languageRoute = validateLanguage(params.language) ? params.language : 'en'
  const siteText = sectionTitles[languageRoute]
  const title = `${siteText.donate} | ${siteText.siteTitle}`
  return {
    title,
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/donate',
        'de-DE': '/de/donate',
        'zh-TW': '/tw/donate'
      },
    },
  }
}

export default function RootLayout({ children, params }) {

    return (
        children
        // <html >
        //   <body>{children}</body>
        // </html>
    )
}
