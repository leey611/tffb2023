import { formatBerlinTime } from "../utils/helpers"
export default function Event({ id, language, event }) {
    const name = event[`Name_${language}`]
    const description = event[`Note_${language}`]
    const place = event['Place']
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
                    <div className="place">{place}</div>
                    <div className="cross">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                </label>
                {/* when accordion is open */}
                <div className='description max-w-3xl'>{description}</div>
            </div>
        </div>
    )
}