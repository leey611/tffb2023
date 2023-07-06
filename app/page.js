import Link from 'next/link';
import Film from './Film'

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
    // <html lang={params.language || 'en'}>
    //         <body>
              <>
              {/* <div>{params.language || 'en'}</div> */}
            <Link href="/">EN </Link>
            <Link href="/de">DE </Link>
            <Link href="/tw">TW </Link>
            <Film></Film>
            <h1>TFFB</h1>
            {movies.records.map(movie => <div>
              <div>movie id: {movie.id}</div>
              <h2>{movie.fields['Name_ch']}</h2>
            </div>)}
              </>
           
          //   </body>
          // </html>
    )
  }