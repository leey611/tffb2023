import { formatBerlinTime, sectionTitles } from '../utils/helpers'
export default function FilmEvent({ language, event}) {
    const name = event[`Name_${language}`]
    const { year, month, day, hour, minute } = formatBerlinTime(event.Date)
    return (
        <div>
            <h5>{name}</h5>
            <h5>{`${day}.${month}.${year}`}</h5>
        
        </div>
    )
}