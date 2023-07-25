import '../globals.css'
import '../style.scss'
import Scaffold from "../../components/Scaffolding";
import Film from "../../components/Film";
import Events from '../../components/Events';
import Sponsors from '../../components/Sponsors';
import SectionTitle from '../../components/SectionTitle';
import localFont from 'next/font/local'
import { validateLanguage, sectionTitles } from '../../utils/helpers';
import Questions from '../../components/Questions';
const myFont = localFont({ src: '../../fonts/terminal-grotesque-webfont.woff2' })

const airtableApiKey = process.env.AIRTABLE_API_KEY
const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableTableId = process.env.AIRTABLE_TABLE_FILMS_ID
const airtableTableFilmsViewId = process.env.AIRTABLE_TABLE_FILMS_VIEW_ID
const airtableTableFilmEventId = process.env.AIRTABLE_TABLE_FILMEVENTS_ID
const airtableTableFilmEventViewId = process.env.AIRTABLE_TABLE_FILMEVENTS_VIEW_ID
const airtableTableOthersId = process.env.AIRTABLE_TABLE_OTHERS_ID
const airtableTableOthersViewId = process.env.AIRTABLE_TABLE_OTHERS_VIEW_ID

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

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
    //console.log('data records', data.records[0]);
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
    console.log('all others', data)
    return data.records
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({ params }) {
  const lang = validateLanguage(params.language) ? params.language : 'en'
  let films = await getFilms()
  const filmEvents = await getFilmEvents()
  for (let film of films.records) {
    const filmId = film.id
    film.fields['Events'] = filmEvents.filter(event => event.fields.Film[0] === filmId)
  }
  const others = await getOthers()
  const sponsors = others.filter(data => data.fields['Type'] === 'Sponsor')
  const questions = others.filter(data => data.fields['Type'] === 'Question')

  
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
          <h2 className={`${myFont.className} section__title`}>{sectionTitles[lang].eventSectionTitle}</h2>
          <Events language={lang}/>
          <SectionTitle content={sectionTitles[lang].sponsorSectionTitle}></SectionTitle>
          <h2 className={`${myFont.className} section__title`}>{sectionTitles[lang].sponsorSectionTitle}</h2>
          <Sponsors language={lang} sponsors={sponsors}/>
          <Questions language={lang} questions={questions}/>
      </Scaffold>
  );
}
