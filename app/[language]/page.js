import '../globals.css'
import '../style.scss'
import Scaffold from "../../components/Scaffolding";
import Film from "../../components/Film";
import Sponsors from '../../components/Sponsors';
import Modal from '../../components/Modal';
import localFont from 'next/font/local'
import { validateLanguage, sectionTitles } from '../../utils/helpers';
const myFont = localFont({ src: '../../fonts/terminal-grotesque-webfont.woff2' })

let airtableApiKey = process.env.AIRTABLE_API_KEY
let airtableBaseId = process.env.AIRTABLE_BASE_ID
let airtableTableId = process.env.AIRTABLE_TABLE_FILMS_ID
let airtableTableFilmsViewId = process.env.AIRTABLE_TABLE_FILMS_VIEW_ID

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

async function getFilms() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?view=${airtableTableFilmsViewId}`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      cache: 'no-store' 
    });
    const data = await res.json();
    console.log('data records', data.records[0]);
    return data
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({ params }) {
  const films = await getFilms()
  const lang = validateLanguage(params.language) ? params.language : 'en'
  return (
      <Scaffold lang={params.language}>
        <h2 className={`${myFont.className} section__title`}>{sectionTitles[lang].filmSectionTitle}</h2>
        
        {films.records.map(film =>
          !isEmpty(film.fields) && <Film
              key={film.id}
              id={film.id}
              language={lang}
              film={film.fields}
          >
          </Film>
          )}
          <h2 className={`${myFont.className} section__title`}>{sectionTitles[lang].sponsorSectionTitle}</h2>
          <Sponsors></Sponsors>
      </Scaffold>
  );
}
