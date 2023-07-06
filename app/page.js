import './globals.css'
import Scaffold from '../components/Custom_scaffold'

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
    //console.log(data.records);
    return data
  } catch (error) {
    console.log(error);
  }
}

export default async function Page() {
  const movies = await getMovies()
    return (
      <Scaffold lang="en">
        {movies.records.map(movie => <div>
              <div>movie id: {movie.id}</div>
              <h2>{movie.fields['Name_en']}</h2>
            </div>)}
      </Scaffold>
    )
  }
