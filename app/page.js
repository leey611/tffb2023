import './globals.css'
import './style.scss'
import Scaffold from '../components/Scaffolding'
import Film from '../components/Film'
import Sponsors from '../components/Sponsors'
import localFont from 'next/font/local'
import { isEmpty, sectionTitles } from '../utils/helpers'
import Questions from '../components/Questions'
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })

let airtableApiKey = process.env.AIRTABLE_API_KEY
let airtableBaseId = process.env.AIRTABLE_BASE_ID
let airtableTableId = process.env.AIRTABLE_TABLE_FILMS_ID
let airtableTableFilmsViewId = process.env.AIRTABLE_TABLE_FILMS_VIEW_ID



async function getFilms() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?view=${airtableTableFilmsViewId}`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      cache: 'no-store' 
    });
    const data = await res.json();
    //console.log('data records', data.records[0]);
    return data
  } catch (error) {
    console.log(error);
  }
}

export default async function Page() {
  const films = await getFilms()
    return (
      <Scaffold lang="en">
        {/* ALL Films */}
        <h2 className={`${myFont.className} section__title`}>{sectionTitles['en'].filmSectionTitle}</h2>
        {films.records.map(film =>
          !isEmpty(film.fields) && <Film
              key={film.id}
              id={film.id}
              language={'en'}
              film={film.fields}
          >
          </Film>
        )}

        {/* ALL Sponsors  */}
        <h2 className={`${myFont.className} section__title`}>{sectionTitles['en'].sponsorSectionTitle}</h2>
        <Sponsors language={'en'}></Sponsors>
        <Questions language={'en'}/>
      </Scaffold>
    )
  }
