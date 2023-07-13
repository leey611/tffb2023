import Image from 'next/image'
import localFont from 'next/font/local'

const formatDate = (date, options) =>
        date.toLocaleString("en-GB", { timeZone: "Europe/Berlin", ...options });
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })
export default function Film(props) {
    let {
        id,
        name,
        director,
        synopsis,
        time,
        themes,
        mainImg,
        mainImgUrl,
        subImages,
        subImageUrls
    } = props
    let isOpeningFilm = themes.includes('Opening')
    const dateObj = new Date(time)
    const berlinYear = formatDate(dateObj, { year: "numeric" });
    const berlinMonth = formatDate(dateObj, { month: "2-digit" });
    const berlinDay = formatDate(dateObj, { day: "2-digit" });
    const berlinHour = formatDate(dateObj, { hour: "2-digit" });
    const berlinMinute = formatDate(dateObj, { minute: "2-digit" }).padStart(2, "0");
    subImageUrls = subImageUrls.split('\n')
    //console.log('main img',mainImg)
    return (
        <div>  
            {/* {isOpeningFilm && <h3 className={`openingFilmTheme ${myFont.className}`}>Opening Film</h3>} */}
            <input type="checkbox" defaultChecked={isOpeningFilm} id={id} className="film__checkbox"></input>
            {/* {isOpeningFilm && <h3 className={`openingFilmTheme ${myFont.className}`}>Opening Film</h3>} */}
            <div className="film__item item w-full">
                {/* when accordion is close */}
                <label className="film__toggle__area" htmlFor={id}>
                    <h3 className="film__name">{name}</h3>
                    <div className="film__date">{`${berlinDay}.${berlinMonth}.${berlinYear}`}</div>
                    <div className="film__time">{`${berlinHour}:${berlinMinute}`}</div>
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
                    {/* <label htmlFor={id} className="film__toggle__area">accordion is open</label> */}
                    {/* <img src={mainImg} width={500}/>
                    <div>{mainImg}</div> */}
                    
                    {/* <div className="Main_img"> */}
                        <img src={mainImgUrl} className='mainImg'/>
                        {/* <Image src={mainImg} width={400} height={300}/> */}
                    {/* </div> */}
                    <h3 className="name">{name}</h3>
                    <h4 className="director">{director}</h4>
                    <p className="synopsis">{synopsis}</p>
                    <div className="cta">
                        <button className="border-secondary text-white bg-secondary py-4 px-8 rounded-full">Watch Trailer</button>
                        <button className="border-2 border-secondary py-[calc(1rem_-_2px)] px-8 rounded-full ">Buy Ticket</button>
                        
                    </div>
                    <div className="themes">
                        {themes.map(theme => <div className="bg-primary text-tertiary inline-block rounded-md px-5 py-2"># {theme}</div>)}
                    </div>
                    {/* <div className='subImages'>
                        {subImages.map(img => <img src={img.url} />)}
                    </div> */}
                    <div className='subImages'>
                        {subImageUrls.map(img => <img src={img} />)}
                    </div>
                    {/* <div>{subImageUrls[0]}</div> */}
                </div>
                
            </div>
        </div>
        
    )
}