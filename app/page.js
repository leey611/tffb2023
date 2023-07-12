import './globals.css'
import './style.scss'
import Scaffold from '../components/Scaffolding'
import Film from '../components/Film'
import localFont from 'next/font/local'
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })

let airtableApiKey
let airtableBaseId
let airtableTableId
let airtableTableFilmsViewId

if (process.env.NODE_ENV !== 'production') {
  airtableApiKey = process.env.AIRTABLE_API_KEY
  airtableBaseId = process.env.AIRTABLE_BASE_ID
  airtableTableId = process.env.AIRTABLE_TABLE_EN_ID
  airtableTableFilmsViewId = process.env.AIRTABLE_TABLE_FILMS_VIEW_ID
} else {
  //airtableApiKey = process.env.CLIENT_KEY;
  //airtableBaseId = process.env.CLIENT_SECRET;
}

async function getMovies() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?view=${airtableTableFilmsViewId}`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });
    const data = await res.json();
    //console.log('data records', data.records[0]);
    return data
  } catch (error) {
    console.log(error);
  }
}

export default async function Page() {
  const movies = await getMovies()
    return (
      <Scaffold lang="en">
        <h2 className={`${myFont.className} section__title`}>ALL FILMS</h2>
        {movies.records.map(movie =>
          <Film
              id={movie.id}
              name={movie.fields['Name_en']}
              director={movie.fields['Director_en']}
              synopsis={movie.fields['Synopsis_en']}
              time={movie.fields['Time']}
              themes={movie.fields['Theme_en']}
              mainImg={movie.fields['MainImage'][0].url}
              subImages={movie.fields['SubImages']}
          >
          </Film>)}
        {/* {movies.records.map(movie => <div>
              <div>movie id: {movie.id}</div>
              <h2>{movie.fields['Name_en']}</h2>
            </div>)} */}
      </Scaffold>
    )
  }
