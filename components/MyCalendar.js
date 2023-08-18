'use client'
import { sectionTitles } from '../utils/helpers';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone';
import 'moment/locale/de'
import 'moment/locale/zh-tw'
import 'moment/locale/en-ca'
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../app/calendar.scss'

const localizer = momentLocalizer(moment)
const berlinTimezone = 'Europe/Berlin';

export default function MyCalendar({ events, language }) {
    const calendarText = sectionTitles[language]
    const {
            calendarToday,
            calendarPrevious,
            calendarNext,
            calendarMonth,
            calendarDay,
            calendarWeek,
            calendarAgenda,
            calendarShowMore
        } = calendarText

    if (!language || language === 'en') moment.locale('en-ca')
    if (language === 'de') moment.locale('de')
    if (language === 'tw') moment.locale('zh-tw')

    moment.tz.setDefault(berlinTimezone); //show berlin time in all timezones

    const myEventList = events.map(event => {
        let time = event.fields.Date || event.fields.Time || event.fields.ScreenTime
        let duration = event.fields.Length
        let startTime = moment(time).tz(berlinTimezone).clone(); // Create a clone of the startTime
        let endTime = startTime.clone().add(duration, 'seconds'); // Create a separate clone for endTime
        return ({
            id: event.id,
            title: event.fields[`Name_${language}`] || event.fields[`FilmName_${language}`],
            start:startTime.toDate(),
            end: endTime.toDate(),
            type: event.fields.ScreenTime ? 'film_event' : 'event_event'
        })
    });

    const earliestStartDate = myEventList.reduce(
        (earliest, event) => (event.start < earliest ? event.start : earliest),
        myEventList[0]?.start
    )

    const eventPropGetter = (event) => ({ className: event.type })
    

    return (
        <div className='mt-[6rem] font-special'>
            <Calendar
                localizer={localizer}
                events={myEventList}
                defaultDate={earliestStartDate}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => console.log('event', event)}
                // style={{ height: 'clamp(90vh, 600px, 700px)' }}
                style={{ height: 'clamp(650px, 80vh, 900px)' }}
                // style={{ height: 550 }}
                eventPropGetter={eventPropGetter}
                messages={{
                    today: calendarToday,
                    previous: calendarPrevious,
                    next: calendarNext,
                    month: calendarMonth,
                    week: calendarWeek,
                    day: calendarDay,
                    agenda: calendarAgenda,
                    showMore: (total) => `+${total} ${calendarShowMore}`,
                }}
            />
        </div>
    )
}