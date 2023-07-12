import Image from 'next/image'
import localFont from 'next/font/local'
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../fonts/terminal-grotesque-webfont.woff2' })
export default function Film(props) {
    const {
        id,
        name,
        director,
        synopsis,
        time,
        themes,
        mainImg,
        subImages,
    } = props
    let isOpeningFilm = themes.includes('Opening')
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
                    <div className="film__date">{"22.9.2023"}</div>
                    <div className="film__time">{"17:30"}</div>
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
                        <img src={mainImg} className='mainImg'/>
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
                        {themes.map(theme => <div className="bg-primary text-tertiary inline-block px-1  rounded-md"># {theme}</div>)}
                    </div>
                    <div className='subImages'>
                        {subImages.map(img => <img src={img.url} />)}
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}