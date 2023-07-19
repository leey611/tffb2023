'use client'
import './globals.css'
import './style.scss'
import { useState, useEffect } from 'react'
import Scaffold from '../components/Scaffolding'
import Film from '../components/Film'
import Sponsors from '../components/Sponsors'
import Modal from '../components/Modal'
import localFont from 'next/font/local'
import { isEmpty, sectionTitles } from '../utils/helpers'
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })

let airtableApiKey = process.env.AIRTABLE_API_KEY
let airtableBaseId = process.env.AIRTABLE_BASE_ID
let airtableTableId = process.env.AIRTABLE_TABLE_FILMS_ID
let airtableTableFilmsViewId = process.env.AIRTABLE_TABLE_FILMS_VIEW_ID



async function getFilms() {
  try {
    const res = await fetch('http://localhost:3000/api/films');
    const data = await res.json();
    //console.log('data records', data);
    return data
  } catch (error) {
    console.log(error);
  }
}

export default function Page() {
  const [films, setFilms] = useState([])
  useEffect(() => {
    async function setFilmState() {
      const data = await getFilms()
      setFilms(data.records)
    } 
    setFilmState()
  }, [])
  //const films = await getFilms()
  //const [state, setState] = useState(0)
    return (
      <Scaffold lang="en">
        <Modal></Modal>
        {/* ALL Films */}
        <h2 className={`${myFont.className} section__title`}>{sectionTitles['en'].filmSectionTitle}</h2>
        {/* <div>{state}</div> */}
        {films.map(film =>
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
        {/* <Sponsors language={'en'}></Sponsors> */}
      </Scaffold>
    )
  }
