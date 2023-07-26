'use client'
import { useState, useEffect } from 'react'
import { sectionTitles } from '../utils/helpers'
import '../app/modal.scss'

export default function Modal(props) {
    const { id, trailerUrl, language } = props
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
            <button className="text-h4 text-white bg-secondary py-3 px-5 rounded-full font-special font-medium mr-4" onClick={toggleModal}>{sectionTitles[language].watchTrailer}</button>
            <div className={`modal ${isTrailerOpen && 'show'}`}>
                <div className='video__container'>
                    <iframe
                        className='trailer'
                        src={trailerUrl}>
                        
                    </iframe>
                </div>
                
            </div>
            <div className={`gray ${isTrailerOpen && 'show'}`} onClick={toggleModal}></div>
        </>
    )
}