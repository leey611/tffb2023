import OpeningClosingFilmLabel from './OpeningClosingFilmLabel'
import Modal from './Modal'
import localFont from 'next/font/local'
import '../app/film.scss'
import { formatBerlinTime, sectionTitles } from '../utils/helpers'
import FilmEvent from './FilmEvent'

const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })

export default function Film(props) {
    const { id, film, language } = props
    let {
        ScreenTime,
        Place,
        MainImageUrl,
        SubImageUrls,
        DirectorImageUrl,
        IsOpeningFilm,
        IsClosingFilm,
        Events,
        Length
    } = film
    // dropbox image url replacement
    MainImageUrl = MainImageUrl.replace(/&dl=0(?!.*&dl=0)/, "&raw=1");
    DirectorImageUrl = DirectorImageUrl.replace(/&dl=0(?!.*&dl=0)/, "&raw=1");
    SubImageUrls = SubImageUrls.split('\n').map(url => url.replace(/&dl=0(?!.*&dl=0)/, "&raw=1"))
    
    const name = film[`FilmName_${language}`]
    const director = film[`Director_${language}`]
    const synopsis = film[`Synopsis_${language}`]
    const themes = film[`Theme_${language}`]
    const directorIntro = film[`Director_Intro_${language}`]
    let genre = film[`Genre_${language}`].join(' | ')
    let prizes = film[`Prize_Nomination_${language}`]
    genre = genre.concat(' | ', Length/60)
    // let isOpeningFilm = film.isOpeningFilm
    prizes = prizes.split('\n')
    const { year, month, day, hour, minute } = formatBerlinTime(ScreenTime)
    
    return (
        <div> 
             {/* using a checkbox + label and CSS to make an accordian, both X and label can toggle it */}
            <input type="checkbox" defaultChecked={IsOpeningFilm} id={id} className="film__checkbox"></input>
            <div className="film__item item w-full">
                {/* when accordion is close */}
                <label className={`film__toggle__area ${IsOpeningFilm && 'isOpeningFilm'} ${IsClosingFilm && 'isClosingFilm'}`} htmlFor={id}>
                    <h3 className="film__name">{name}</h3>
                    {IsOpeningFilm && <OpeningClosingFilmLabel isOpening={IsOpeningFilm} language={language}></OpeningClosingFilmLabel>}
                    {IsClosingFilm && <OpeningClosingFilmLabel isClosing={IsClosingFilm} language={language}></OpeningClosingFilmLabel>}
                    <div className="film__date">{`${day}.${month}.${year}`}</div>
                    <div className="film__time">{`${hour}:${minute}`}</div>
                    <div className="film__place">
                         <h4>{Place}</h4>
                    </div>
                   
                    <div className="cross">
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div> 
                </label>
                
                {/* when accordion is open */}
                <div className="film__info info">
                    <h3 className="name text-h1 font-sans font-medium">{name}</h3>
                    <h4 className="director text-h2 font-sans font-medium">{director}</h4>
                    <img src={MainImageUrl} className='mainImg'/>
                    <div className='events'>
                        {Events.map(event => <FilmEvent id={event.id} language={language} event={event.fields}/>)}
                    </div>
                    <div className="themes">
                        {themes.map(theme => <div className="bg-primary text-tertiary inline-block rounded-md px-5 py-2 text-b1 font-sans font-medium"># {theme}</div>)}
                    </div>
                    <p className="synopsis">{synopsis}</p>
                    <div className='subImages'>
                        {SubImageUrls.map(imgUrl => <img src={imgUrl} />)}
                    </div>
                    <div className="cta">
                        <Modal id={id} trailerUrl={'https://www.youtube.com/embed/kKsivrgoyDw'}></Modal>
                        <button className="border-2 border-secondary py-[calc(0.5rem_-_2px)] px-4 rounded-full text-b1 font-sans font-medium">Buy Ticket</button>
                    </div>
                    <div className='prizes'>
                        {prizes.map(prize => <p>{prize}</p>)}
                    </div>
                    <div className='genres'>{genre}</div>
                    <img src={DirectorImageUrl} className='directorImg'/>
                    <p className='directorIntro'>{directorIntro}</p>
                </div>
                
            </div>
        </div>
        
    )
}