import '../globals.css'
import { validateLanguage, sectionTitles } from '../../utils/helpers'

export async function generateMetadata({ params }) {
  const languageRoute = validateLanguage(params.language) ? params.language : 'en'
  const siteText = sectionTitles[languageRoute]
  const title = `${siteText.aboutUs} | ${siteText.siteTitle}`
  return {
    title,
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/about',
        'de-DE': '/de/about',
        'zh-TW': '/tw/about'
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
