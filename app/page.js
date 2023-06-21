let airtableApiKey
let airtableBaseId
let airtableTableId

if (process.env.NODE_ENV !== 'production') {
  airtableApiKey = process.env.AIRTABLE_API_KEY
  airtableBaseId = process.env.AIRTABLE_BASE_ID
  airtableTableId = process.env.AIRTABLE_TABLE_EN_ID
} else {
  //airtableApiKey = process.env.CLIENT_KEY;
  //airtableBaseId = process.env.CLIENT_SECRET;
}

async function getMovies() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`, {
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
    return <div>
            <h1>TFBB</h1>
            {movies.records.map(movie => <div>
              <div>movie id: {movie.id}</div>
              <h2>{movie.fields['片名']}</h2>
            </div>)}
          </div>
  }