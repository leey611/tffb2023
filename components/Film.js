import localFont from 'next/font/local'
import '../app/film.scss'
import { formatBerlinTime } from '../utils/helpers'

const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })

export default function Film(props) {
    const { id, film, language } = props
    let {
        ScreenTime,
        MainImageUrl,
        SubImageUrls,
    } = film
    
    SubImageUrls = SubImageUrls.split('\n')
    const name = film[`FilmName_${language}`]
    const director = film[`Director_${language}`]
    const synopsis = film[`Synopsis_${language}`]
    const themes = film[`Theme_${language}`]
    let isOpeningFilm = film.isOpeningFilm
    const { year, month, day, hour, minute } = formatBerlinTime(ScreenTime)
    
    return (
        <div> 
             {/* using a checkbox + label and CSS to make an accordian, both X and label can toggle it */}
            <input type="checkbox" defaultChecked={isOpeningFilm} id={id} className="film__checkbox"></input>
            <div className="film__item item w-full">
                {/* when accordion is close */}
                <label className="film__toggle__area" htmlFor={id}>
                    <h3 className="film__name">{name}</h3>
                    <div className="film__date">{`${day}.${month}.${year}`}</div>
                    <div className="film__time">{`${hour}:${minute}`}</div>
                    <div className="film__place">
                         <h4>{"Kino Central"}</h4>
                    </div>
                   
                    <div className="cross">
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div> 
                </label>
                
                {/* when accordion is open */}
                <div className="film__info info">
                    {isOpeningFilm && <h3 className={`openingFilmTheme ${myFont.className}`}>Opening Film</h3>}
                    <h3 className="name">{name}</h3>
                    <h4 className="director">{director}</h4>
                    <img src={MainImageUrl} className='mainImg'/>
                    <div className="themes">
                        {themes.map(theme => <div className="bg-primary text-tertiary inline-block rounded-md px-5 py-2"># {theme}</div>)}
                    </div>
                    {/* <p className="synopsis">{synopsis}</p> */}
                    <div className='subImages'>
                        {SubImageUrls.map(imgUrl => <img src={imgUrl} />)}
                    </div>
                    <div className="cta">
                        <button className="border-secondary text-white bg-secondary py-4 px-8 rounded-full">Watch Trailer</button>
                        <button className="border-2 border-secondary py-[calc(1rem_-_2px)] px-8 rounded-full ">Buy Ticket</button>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}