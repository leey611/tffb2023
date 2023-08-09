import '../globals.css'
import '../style.scss'
import Scaffold from "../../components/Scaffolding";
import Marquee from '../../components/Marquee';
import Film from "../../components/Film";
import Events from '../../components/Events';
import Sponsors from '../../components/Sponsors';
import Footer from '../../components/Footer';
import SectionTitle from '../../components/SectionTitle';
import localFont from 'next/font/local'
import { validateLanguage, sectionTitles } from '../../utils/helpers';
import Questions from '../../components/Questions';
import LanguageSelect from '../../components/LanguageSelect'
import SpecialTitle from '../../components/SpecialTitle'
import Modal from '../../components/Modal';
import dynamic from 'next/dynamic';


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
    //console.log('all others', data)
    return data.records
  } catch (error) {
    console.log(error);
  }
}

const Dynamicp5TestTwo = dynamic(
  () => import('../../components/Testp5Two/Testp5Two'),
  {
    ssr: false,
    loading: () => (<div className="fixed w-full h-screen bg-white z-[100] flex justify-center items-center">
      <div className="flex w-[300px] flex-col" >
        <img src="../img/hero2Img.png"></img>
        <br />
        <img src="../img/loading-text.gif"></img>
      </div>
    </div>
    )
  }
)

// export async function generateMetadata({ params }) {
//   const languageRoute = validateLanguage(params.language) ? params.language : 'en'
//   const title = sectionTitles[languageRoute].siteTitle
//   return {
//     title,
//   }
// }

export default async function Page({ params }) {
  const lang = validateLanguage(params.language) ? params.language : 'en'
  let films = await getFilms()
  const filmEvents = await getFilmEvents()
  for (let film of films.records) {
    const filmId = film.id
    film.fields['Events'] = filmEvents.filter(event => event.fields.Film[0] === filmId)
  }
  const others = await getOthers()
  const marquee = others.filter(data => data.fields['Type'] === 'Donate-Float').map(marquee => marquee.fields[`Title_${lang}`]).join('');
  const sponsors = others.filter(data => data.fields['Type'] === 'Sponsor').map(sponsor => {
    sponsor.fields['Img'] = sponsor.fields['Img'] ? sponsor.fields['Img'].replace(/&dl=0(?!.*&dl=0)/, "&raw=1") : 'hi'
    return sponsor
  })
  const partners = others.filter(data => data.fields['Type'] === 'Partner').map(sponsor => {
    sponsor.fields['Img'] = sponsor.fields['Img'] ? sponsor.fields['Img'].replace(/&dl=0(?!.*&dl=0)/, "&raw=1") : 'hi'
    return sponsor
  })
  const questions = others.filter(data => data.fields['Type'] === 'Question')
  const websiteGlobal = others.filter(data => data.fields['Type'] === 'Website')[0]
  const aboutThisYear = others.filter(data => data.fields['Type'] === 'About-This-Year')
  const heroText = websiteGlobal.fields[`Title_${lang}`].split('\n')
  const venueLink = websiteGlobal.fields['VenueLink']
  const trailer = websiteGlobal.fields['TrailerLink']
  return (
    <>
      <div id="content" className='relative'>
        <div className='w-full min-h-screen flex flex-col justify-center isolate relative z-[60]'>
          <LanguageSelect />
          <div className="py-10 mix-blend text-shadow">
            <div className='mix top'>
              <Dynamicp5TestTwo />
            </div>
            <h1 className='text-center text-h1 font-special text-primary'>{websiteGlobal.fields[`Theme_${lang}`]}</h1>
            {heroText.map(text => <h1 className='text-center text-h1 font-special'>{text}</h1>)}
          </div>
          <div className='text-center z-50'>
            <Modal language={lang} trailerUrl={trailer} venueLink={venueLink} />
          </div>
        </div>

        <Marquee content={marquee} link={`/${lang}/donate`}></Marquee>

        <section className="max-w-1440 mx-auto px-[5vw]">
          <SpecialTitle year={websiteGlobal.fields['Year']} title={sectionTitles[lang].filmSectionTitle} img="img/hero2Img.png" />
          <SectionTitle content={sectionTitles[lang].aboutSectionTitle}></SectionTitle>
          <Questions language={lang} questions={aboutThisYear} />

          <div className='mt-[6rem]'>
            {films.records.map(film =>
              !isEmpty(film.fields) && <Film
                key={film.id}
                id={film.id}
                language={lang}
                film={film.fields}
              >
              </Film>
            )}
          </div>

          {/* ALL Events  */}
          <SectionTitle content={sectionTitles[lang].eventSectionTitle}></SectionTitle>
          <Events language={lang} />

          {/* ALL Sponsors  */}
          <SectionTitle content={sectionTitles[lang].sponsorSectionTitle}></SectionTitle>
          <Sponsors language={lang} sponsors={sponsors} />

          <SectionTitle content={sectionTitles[lang].partnerSectionTitle}></SectionTitle>
          <Sponsors language={lang} sponsors={partners} />

          <SectionTitle content={sectionTitles[lang].questionSectionTitle}></SectionTitle>
          <Questions language={lang} questions={questions} />

          <Footer language={lang} />
        </section>
      </div>
    </>
  );
}
