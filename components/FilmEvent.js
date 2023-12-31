import { formatBerlinTime, sectionTitles } from '../utils/helpers'
export default function FilmEvent({ language, event}) {
    const name = event[`Name_${language}`]
    const { year, month, day, hour, minute } = formatBerlinTime(event.Date)
    return (
        <div className='border-b border-black mb-4'>
            <h5 className="font-sans font-semibold ">{name}</h5>
            <h5 className="font-sans font-semibold text-primary pt-1 pb-2">{`${day}.${month}.${year} | ${hour}:${minute}`}</h5>
        </div>
    )
}