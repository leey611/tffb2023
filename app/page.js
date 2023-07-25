import './globals.css'
import './style.scss'
import Scaffold from '../components/Scaffolding'
import Film from '../components/Film'
import Events from '../components/Events'
import Sponsors from '../components/Sponsors'
import localFont from 'next/font/local'
import { isEmpty, sectionTitles } from '../utils/helpers'
import Questions from '../components/Questions'
import SectionTitle from '../components/SectionTitle'
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })

const airtableApiKey = process.env.AIRTABLE_API_KEY
const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableTableId = process.env.AIRTABLE_TABLE_FILMS_ID
const airtableTableFilmsViewId = process.env.AIRTABLE_TABLE_FILMS_VIEW_ID
const airtableTableFilmEventId = process.env.AIRTABLE_TABLE_FILMEVENTS_ID
const airtableTableFilmEventViewId = process.env.AIRTABLE_TABLE_FILMEVENTS_VIEW_ID
const airtableTableOthersId = process.env.AIRTABLE_TABLE_OTHERS_ID
const airtableTableOthersViewId = process.env.AIRTABLE_TABLE_OTHERS_VIEW_ID

async function getFilmEvents() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableFilmEventId}?view=${airtableTableFilmEventViewId}`, {
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


async function getFilms() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?view=${airtableTableFilmsViewId}`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      cache: 'no-store' 
    });
    const data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

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
  let films = await getFilms()
  const filmEvents = await getFilmEvents()
  for (let film of films.records) {
    const filmId = film.id
    film.fields['Events'] = filmEvents.filter(event => event.fields.Film[0] === filmId)
  }
  console.log('film 0', films.records[0])
  const others = await getOthers()
  const sponsors = others.filter(data => data.fields['Type'] === 'Sponsor')
  const questions = others.filter(data => data.fields['Type'] === 'Question')
    return (
      <Scaffold lang="en">
        {/* ALL Films */}

        <section className="max-w-1440 mx-auto px-[5vw]">
        {/* <h2 className={`${myFont.className} section__title`}>{sectionTitles['en'].filmSectionTitle}</h2> */}
        <SectionTitle content={sectionTitles['en'].filmSectionTitle}></SectionTitle>
        {films.records.map(film =>
          !isEmpty(film.fields) && <Film
              key={film.id}
              id={film.id}
              language={'en'}
              film={film.fields}
          >
          </Film>
        )}

        {/* ALL Events  */}
        <SectionTitle content={sectionTitles['en'].eventSectionTitle}></SectionTitle>
        <Events language={'en'}/>

        {/* ALL Sponsors  */}
        <SectionTitle content={sectionTitles['en'].sponsorSectionTitle}></SectionTitle>
        <Sponsors language={'en'} sponsors={sponsors}/>
        <Questions language={'en'} questions={questions}/>
        </section>
        
      </Scaffold>
    )
  }
