import LanguageSelect from "./LanguageSelect";
import Marquee from "./Marquee";
import Modal from "./Modal";
import Questions from "./Questions";
import SectionTitle from "./SectionTitle";
import SpecialTitle from "./SpecialTitle";
import Film from "./Film";
import Events from "./Events";
import Sponsors from "./Sponsors";
import Calendar from "./MyCalendar";
import Footer from "./Footer";
import dropboxUrl from "../utils/dropboxUrl";
import { sectionTitles, isEmpty } from "../utils/helpers";
import dynamic from 'next/dynamic'
import RichText from "./RichText";
import P5preloader from "./P5preloader";

const airtableApiKey = process.env.AIRTABLE_API_KEY
const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableTableId = process.env.AIRTABLE_TABLE_FILMS_ID
const airtableTableFilmsViewId = process.env.AIRTABLE_TABLE_FILMS_VIEW_ID
const airtableTableFilmEventId = process.env.AIRTABLE_TABLE_FILMEVENTS_ID
const airtableTableFilmEventViewId = process.env.AIRTABLE_TABLE_FILMEVENTS_VIEW_ID
const airtableTableOthersId = process.env.AIRTABLE_TABLE_OTHERS_ID
const airtableTableOthersViewId = process.env.AIRTABLE_TABLE_OTHERS_VIEW_ID
const airtableTableEventsId = process.env.AIRTABLE_TABLE_EVENTS_ID
const airtableTableEventsViewId = process.env.AIRTABLE_TABLE_EVENTS_VIEW_ID

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

async function getEvents() {
    try {
      const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableEventsId}?view=${airtableTableEventsViewId}`, {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
        cache: 'no-store'
      });
      const data = await res.json();
      //console.log('events', data.records)
      return data.records
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
    () => import('./Testp5Two/Testp5Two'),
    {
        ssr: false,
        loading: () => <P5preloader />
        
    }
)

export default async function HomeView({ language }) {
    const otherEvents = await getEvents()
    let allEvents = [...otherEvents.filter(evt => evt.fields.Name_en !== 'Opening Ceremony' && evt.fields.Name_en !== 'Closing Party')]
    let films = await getFilms()
    const filmEvents = await getFilmEvents()
    for (let film of films.records) {
        const filmId = film.id
        const eventsOfFilm = filmEvents.filter(event => event.fields.Film[0] === filmId)
        film.fields['Events'] = eventsOfFilm
        allEvents = [...allEvents, ...eventsOfFilm, film]
    }
    console.log('all event count', allEvents.length)
    const others = await getOthers()
    const marquee = others.filter(data => data.fields['Type'] === 'Donate-Float').map(marquee => marquee.fields[`Title_${language}`]).join('');
    const sponsors = others.filter(data => data.fields['Type'] === 'Sponsor').map(sponsor => {
        sponsor.fields['Img'] = sponsor.fields['Img'] ? dropboxUrl(sponsor.fields['Img']) : 'hi'
        return sponsor
    })
    const partners = others.filter(data => data.fields['Type'] === 'Partner').map(sponsor => {
        sponsor.fields['Img'] = sponsor.fields['Img'] ? dropboxUrl(sponsor.fields['Img']) : 'hi'
        return sponsor
    })
    const questions = others.filter(data => data.fields['Type'] === 'Question')
    const websiteGlobal = others.filter(data => data.fields['Type'] === 'Website')[0]
    const aboutThisYear = others.filter(data => data.fields['Type'] === 'About-This-Year')
    const websiteGlobalFields = websiteGlobal.fields
    const heroText = websiteGlobalFields[`Title_${language}`].split('\n')
    const venueLink = websiteGlobalFields['VenueLink']
    const trailer = websiteGlobalFields['TrailerLink']
    const sectionText = sectionTitles[language]
    const { filmSectionTitle, aboutSectionTitle, eventSectionTitle, sponsorSectionTitle, partnerSectionTitle, questionSectionTitle } = sectionText
    return (
        <div id="content" className='relative'>
            <div className='w-full min-h-screen flex flex-col justify-center isolate relative z-[60]'>
                <LanguageSelect />
                <div className="py-10 mix-blend text-shadow">
                    <Dynamicp5TestTwo />
                    <h1 className={`text-center text-h1 font-special text-primary ${language === 'tw' ? 'font-semibold' : ''}`}>{websiteGlobalFields[`Theme_${language}`]}</h1>
                    {heroText.map((text, i)=> <h1 className={`text-center text-h1 font-special ${language === 'tw' && (i === 0 ) ? 'font-semibold' : ''}`}>{text}</h1>)}
                </div>
                <div className='text-center z-50'>
                    <Modal language={language} trailerUrl={trailer} venueLink={venueLink} />
                </div>
            </div>

            <Marquee content={marquee} link={`/${language}/donate`} />

            <section className="max-w-1440 mx-auto px-[5vw]">
                <SpecialTitle year={websiteGlobalFields['Year']} title={aboutSectionTitle} img="../img/hero2Img.png" />
                <div>
                    {aboutThisYear?.map(obj => <div key={obj.id} className="my-4">
                        <h2 className="font-special text-h2 font-semibold mb-2">{obj.fields[`Question_${language}`]}</h2>
                        <div>
                            <RichText content={obj.fields[`Answer_${language}`]}/>
                        </div>
                    </div>)}
                </div>
                <SectionTitle content={filmSectionTitle}></SectionTitle>
                {/* <Questions language={language} questions={aboutThisYear} /> */}

                <div className=''>
                    {films.records.map(film =>
                        !isEmpty(film.fields) && <Film
                            key={film.id}
                            id={film.id}
                            language={language}
                            film={film.fields}
                        >
                        </Film>
                    )}
                </div>

                {/* ALL Events  */}
                <SectionTitle content={eventSectionTitle}></SectionTitle>
                <Events events={otherEvents}language={language} />

                {/* ALL Sponsors  */}
                <SectionTitle content={sponsorSectionTitle}></SectionTitle>
                <Sponsors language={language} sponsors={sponsors} />

                <SectionTitle content={partnerSectionTitle}></SectionTitle>
                <Sponsors language={language} sponsors={partners} />

                <SectionTitle content={questionSectionTitle}></SectionTitle>
                <Questions language={language} questions={questions} />
                
                <Calendar events={allEvents} language={language}/>
                <Footer language={language} />
            </section>
        </div>
    )
}