import { isEmpty } from '../utils/helpers'
import Event from './Event'
import '../app/events.scss'

export default async function Events({ events, language}) {
    return (
        <div>
          {events?.map(event => !isEmpty(event.fields) && <Event key={event.id} id={event.id} language={language} event={event.fields}></Event>
          )}
        </div>
    )
}