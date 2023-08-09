import '../globals.css'
import { validateLanguage, sectionTitles } from '../../utils/helpers'

export async function generateMetadata({ params }) {
  const languageRoute = validateLanguage(params.language) ? params.language : 'en'
  const title = sectionTitles[languageRoute].siteTitle
  const description = sectionTitles[languageRoute].description
  return {
    title,
    description,
  }
}

export default function RootLayout({ children, params }) {
    return (
      // <Scaffolding lang={params.language}>
        // { children }
      // </Scaffolding>
        // <html lang={params.language}>
        //     <body>
        //         <div>{params.language}</div>
        //     </body>
        // </html>
        children
        // <html>
        //   <body>{children}</body>
        // </html>
      
    );
  }
