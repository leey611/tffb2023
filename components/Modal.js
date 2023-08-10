'use client'
import { useState, useEffect } from 'react'
import { convertToEmbedURL, sectionTitles } from '../utils/helpers'
import '../app/modal.scss'

export default function Modal(props) {
    let { trailerUrl, language, venueLink } = props
    trailerUrl = convertToEmbedURL(trailerUrl)
    const [isTrailerOpen, setTrailerOpen] = useState(false)
    const toggleModal = () => {
        setTrailerOpen(!isTrailerOpen)
    }
    useEffect(() => {
        // Change the CSS of the <body> element
        document.body.style.overflowY = isTrailerOpen ? 'hidden' : 'auto';
    }, [isTrailerOpen]);

    return (
        <>
        <div className="cta my-5 self-center">
            <button className="border-2 border-secondary text-h4 text-white bg-secondary py-3 px-5 rounded-full font-special font-medium mr-4" onClick={toggleModal}>{sectionTitles[language].watchTrailer}</button>
            
            <a href={venueLink} target="_blank">
                <button className="border-2 border-secondary py-3 px-5 rounded-full text-h4 font-special font-medium">{sectionTitles[language].buyTicket}</button>
            </a>
            
        </div>
        
        {
                isTrailerOpen &&
                // <div className='w-100 h-100 relative'>
                <>
                <div className={`modal ${isTrailerOpen && 'show'}`}>
                    <div className='video__container'>
                        <iframe
                            className='trailer'
                            src={trailerUrl}>
                        </iframe>
                    </div>
                </div>
                <div className={`gray ${isTrailerOpen && 'show'}`} onClick={toggleModal}></div>
                {/* // </div> */}
                </>
            }
        </>
    )
}