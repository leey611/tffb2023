import './globals.css'
import './style.scss'
import Scaffold from '../components/Scaffolding'
import Film from '../components/Film'
import Events from '../components/Events'
import Sponsors from '../components/Sponsors'
import Footer from '../components/Footer'
import localFont from 'next/font/local'
import { isEmpty, sectionTitles } from '../utils/helpers'
import SpecialTitle from '../components/SpecialTitle'
import Questions from '../components/Questions'
import SectionTitle from '../components/SectionTitle'
import SocialHandle from '../components/SocialHandle'
import Marquee from '../components/Marquee'
import ResponsiveIframe from '../components/ResponsiveIframe'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import LanguageSelect from '../components/LanguageSelect'
import Modal from '../components/Modal'

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
  //console.log('film 0', films.records[0])
  const others = await getOthers()
  const marquee = others.filter(data => data.fields['Type'] === 'Donate-Float').map(marquee => marquee.fields[`Title_${'en'}`]).join('');
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
  const heroText = websiteGlobal.fields[`Title_${'en'}`].split('\n')
  const trailer = websiteGlobal.fields['TrailerLink']


  const Dynamicp5TestTwo = dynamic(
    () => import('../components/Testp5Two/Testp5Two'),
    {
      ssr: false,
      loading: () => (<div className="fixed w-full h-screen bg-white z-[100] flex justify-center items-center">
      <div className="flex w-[300px] flex-col" >
        <img src="img/hero2Img.png"></img>
        <br/>
        <img src="img/loading-text.gif"></img>
      </div>
    </div>
      )
    }
  )

  const venueLink = websiteGlobal.fields['VenueLink']

  return (
    <Scaffold lang="en">
      {/* ALL Films */}     


      <div id="content">

      <div className='w-full flex h-screen flex-col justify-center isolate relative'>

        <LanguageSelect />


        <div className="py-10 mix-blend text-shadow">
          <div className='mix top'>
            <Dynamicp5TestTwo />
          </div>
          <h1 className='text-center text-h1 font-special text-primary'>{websiteGlobal.fields[`Theme_${'en'}`]}</h1>
          {heroText.map(text => <h1 className='text-center text-h1 font-special'>{text}</h1>)}

        </div>

        <div className='text-center z-50'>
          <Modal language={'en'} trailerUrl={trailer} venueLink={venueLink}/>
        </div>

        {/* <ResponsiveIframe /> */}
        
        {/* <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR> */}

      </div>

      <Marquee content={marquee} link={"/donate"}></Marquee>

      <section className="max-w-1440 mx-auto px-[5vw]">

        <SpecialTitle year={websiteGlobal.fields['Year']} title={sectionTitles['en'].filmSectionTitle} img="img/hero2Img.png" />
        <Questions language={'en'} questions={aboutThisYear} />

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
        <Events language={'en'} />

        {/* ALL Sponsors  */}
        <SectionTitle content={sectionTitles['en'].sponsorSectionTitle}></SectionTitle>
        <Sponsors language={'en'} sponsors={sponsors} />

        <SectionTitle content={"Partners"}></SectionTitle>
        <Sponsors language={'en'} sponsors={partners} />

        <SectionTitle content={sectionTitles['en'].questionSectionTitle}></SectionTitle>
        <Questions language={'en'} questions={questions} />

        <Footer language={'en'} />
      </section>

      </div>

    </Scaffold>
  )
}
