import { formatBerlinTime } from "../utils/helpers"
import RichText from "./RichText"
export default function Event({ id, language, event }) {
    const name = event[`Name_${language}`]
    const note = event[`Note_${language}`]
    const speaker = event[`Speaker_${language}`]
    const speakerIntro = event[`SpeakerIntro_${language}`]
    let { Place, HasSpeakerIntro, SpeakerImg } = event
    SpeakerImg = SpeakerImg ? SpeakerImg.split('\n').map(url => url.replace(/&dl=0(?!.*&dl=0)/, "&raw=1")) : 'img/hero2Img.png'
    const { year, month, day, hour, minute } = formatBerlinTime(event.Time)
    return (
        <div>
            {/* using a checkbox + label and CSS to make an accordian, both X and label can toggle it */}
            <input type="checkbox" id={id} className="event__checkbox"></input>
            <div className="event__item item w-full">
                {/* when accordion is close */}
                <label htmlFor={id}>
                    <div className='date'>{`${month}.${day}.${year}`}</div>
                    <div className="time">{`${hour}:${minute}`}</div>
                    <h3 className="name font-semibold">{name}</h3>
                    <div className="place">{Place}</div>
                    <div className="cross">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                </label>
                {/* when accordion is open */}
                <div className={`description max-w-3xl ${HasSpeakerIntro ? 'hasSpeakerIntro' : ''}`}>
                    {
                        HasSpeakerIntro ? 
                        <div className="block md:flex">
                            <div className="flex mb-4">
                                <img src={SpeakerImg} className="self-start w-[6rem] md:w-[10rem]" alt={speaker}/>
                                <h4 className="block md:hidden self-end ml-6 font-special font-semibold text-h2">{speaker}</h4>
                            </div>
                            <div className=" md:ml-6">
                                <h4 className="hidden md:block mb-4 font-special font-semibold text-h2">{speaker}</h4>
                                <RichText content={speakerIntro}/>
                                <RichText content={note}/>
                            </div>
                        </div>
                        :
                        <>
                            <RichText content={speakerIntro}/>
                            <RichText content={note}/>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}