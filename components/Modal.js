'use client'
import { useState, useEffect } from 'react'
import '../app/modal.scss'

export default function Modal(props) {
    const { id, trailerUrl } = props
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
            <button className="border-secondary text-white bg-secondary py-2 px-4 rounded-full font-sans font-medium" onClick={toggleModal}>Watch Trailer</button>
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