export default async function Page({params}) {
    const movies = await getMovies()
    return (
    // <html lang={params.language || 'en'}>
    //         <body>
              <>
              index.js
              {/* <div>{params.language || 'en'}</div>
            <Link href="/">EN </Link>
            <Link href="/de">DE </Link>
            <Link href="/tw">TW </Link>
            <Film></Film>
            <h1>TFFB</h1>
            {movies.records.map(movie => <div>
              <div>movie id: {movie.id}</div>
              <h2>{movie.fields['Name_ch']}</h2>
            </div>)} */}
              </>
           
          //   </body>
          // </html>
    )
  }