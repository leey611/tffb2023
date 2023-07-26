import '../globals.css'
import '../style.scss'
import Scaffold from "../../components/Scaffolding";
import ResponsiveIframe from "../../components/ResponsiveIframe";
import Marquee from '../../components/Marquee';
import Film from "../../components/Film";
import Events from '../../components/Events';
import Sponsors from '../../components/Sponsors';
import SocialHandle from '../../components/SocialHandle';
import SectionTitle from '../../components/SectionTitle';
import localFont from 'next/font/local'
import { validateLanguage, sectionTitles } from '../../utils/helpers';
import Questions from '../../components/Questions';

import Link from 'next/link'
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
  const marquee = others.filter(data => data.fields['Type'] === 'Donate-Float').map(marquee => marquee.fields[`Title_${lang}`]).join('');
  const sponsors = others.filter(data => data.fields['Type'] === 'Sponsor').map(sponsor => {
    sponsor.fields['Img'] = sponsor.fields['Img'] ? sponsor.fields['Img'].replace(/&dl=0(?!.*&dl=0)/, "&raw=1") : 'hi'
    return sponsor
  })
  const questions = others.filter(data => data.fields['Type'] === 'Question')
  const websiteGlobal = others.filter(data => data.fields['Type'] === 'Website')[0]
  const heroText = websiteGlobal.fields[`Title_${lang}`].split('\n')

  return (
    <Scaffold lang={lang}>
      {/* ALL Films */}

      <div className='w-full h-screen flex flex-col justify-center isolate'>
        <div className="navbar flex justify-center w-full font-special text-h2 py-10">
          <Link href="/">EN</Link>/
          <Link href="/de">DE</Link>/
          <Link href="/tw">TW</Link>
        </div>

        <div className="py-10">
          {heroText.map(text => <h1 className='text-center text-h1 font-special font-semibold'>{text}</h1>)}
          <h1 className='text-center text-h1 font-special font-semibold text-primary'>{websiteGlobal.fields[`Theme_${lang}`]}</h1>
        </div>

        <div className='text-center text-h4 py-[5rem] flex gap-5 justify-center'>
          <Link className="text-white bg-secondary py-3 px-5 rounded-full font-special font-medium" href="/">Watch Trailer</Link>
          <Link href="/" className='border-2 border-secondary py-3 px-5 rounded-full font-special font-medium'>Buy Tickets</Link>
        </div>

        <ResponsiveIframe />
      </div>

      <Marquee content={marquee} link={"/"}></Marquee>

      <section className="max-w-1440 mx-auto px-[5vw]">

        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center w-full font-special text-h1">
            <h2 className="font-special text-black text-center">{websiteGlobal.fields['Year']}</h2>
            <h2 className="font-special text-primary text-center font-semibold">{sectionTitles[lang].filmSectionTitle}</h2>
            <h2 className="font-special text-black text-center">TFFB</h2>
          </div>
          <div className="mx-auto my-10 max-w-[200px]">
            <img src="img/hero2Img.png" className='block w-full'></img>
          </div>
        </div>


        {films.records.map(film =>
          !isEmpty(film.fields) && <Film
            key={film.id}
            id={film.id}
            language={lang}
            film={film.fields}
          >
          </Film>
        )}

        {/* ALL Events  */}
        <SectionTitle content={sectionTitles[lang].eventSectionTitle}></SectionTitle>
        <Events language={lang} />

        {/* ALL Sponsors  */}
        <SectionTitle content={sectionTitles[lang].sponsorSectionTitle}></SectionTitle>
        <Sponsors language={lang} sponsors={sponsors} />

        <SectionTitle content={sectionTitles[lang].questionSectionTitle}></SectionTitle>
        <Questions language={lang} questions={questions} />

        <div className="w-full flex flex-col gap-10 items-center my-[10rem]">
          <div className="w-[200px]">
            <img src="https://www.dropbox.com/scl/fi/qn9ac4ua1gtrplvbhh27h/IMTW_LOGO_-05.png?rlkey=j0ky1zca3mg4tdmfp9mawb92v&raw=1" />
          </div>
          <div>
            <a href=""><button className="border-2 border-secondary py-3 px-5 rounded-full text-h4 font-special font-medium">{sectionTitles[lang].aboutUs}</button>
            </a>
          </div>
          <div className="flex gap-5">
            <SocialHandle logo="img/social_fb.png" link="https://www.facebook.com/ImpressionTaiwan/" />
            <SocialHandle logo="img/social_ig.png" link="https://www.instagram.com/impressiontaiwan/" />
          </div>
        </div>
      </section>

    </Scaffold>
  );
}
