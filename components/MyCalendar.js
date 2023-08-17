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

    const myEventList = events.map(event => ({
        id: event.id,
        title: event.fields[`Name_${language}`] || event.fields[`FilmName_${language}`],
        start: moment(event.fields.Date || event.fields.Time || event.fields.ScreenTime).tz(berlinTimezone).toDate(),
        end: moment(event.fields.Date || event.fields.Time || event.fields.ScreenTime).tz(berlinTimezone).add(1, 'hour').toDate(),
    }));

    const earliestStartDate = myEventList.reduce(
        (earliest, event) => (event.start < earliest ? event.start : earliest),
        myEventList[0]?.start
    )

    return (
        <div className='mt-[6rem] font-special'>
            <Calendar
                localizer={localizer}
                events={myEventList}
                defaultDate={earliestStartDate}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => null}
                // style={{ height: 'clamp(90vh, 600px, 700px)' }}
                style={{ height: 'clamp(650px, 80vh, 900px)' }}
                // style={{ height: 550 }}
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