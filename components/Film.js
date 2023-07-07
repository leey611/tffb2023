export default function Film(props) {
    const {
        id,
        name,
        director,
        synopsis,
    } = props
    let isOpeningFilm = name === 'GAGA'
    let toggle = () => isOpen = !isOpen
    return (
        <>
            <input type="checkbox" defaultChecked={isOpeningFilm} id={id} className="film__checkbox"></input>
            
            <div className="film__item p-4 w-full">
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

                <div className="film__info bg-pink-100">
                    {/* <label htmlFor={id} className="film__toggle__area">accordion is open</label> */}
                    <div className="Main_img h-64">img</div>
                    <h3 className="">{name}</h3>
                    <h4>{director}</h4>
                    <p>{synopsis}</p>
                </div>
                
            </div>
        </>
        
    )
}