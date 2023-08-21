'use client'
import { sectionTitles } from '../utils/helpers';
import { buildUrl, downloadBlob, isIOSSafari, isIOSChrome } from '../utils/calendarHelpers';
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
            start: startTime.toDate(),
            end: endTime.toDate(),
            type: event.fields.ScreenTime ? 'film_event' : 'event_event',
            startTime,
            endTime,
        })
    });

    const earliestStartDate = myEventList.reduce(
        (earliest, event) => (event.start < earliest ? event.start : earliest),
        myEventList[0]?.start
    )
    const latestEndDate = myEventList.reduce(
        (latest, event) => (event.end > latest ? event.end : latest),
        myEventList[0]?.end
    );
    const now = moment().startOf('day');
    console.log('now', now)
    const defaultStartDate = now >= earliestStartDate && now <= latestEndDate ? now : earliestStartDate

    const eventPropGetter = (event) => ({ className: event.type }) 

    const handleClick = (event) => {
        const isCrappyIE = !!(
            typeof window !== "undefined" &&
            window.navigator.msSaveOrOpenBlob &&
            window.Blob
        );
            console.log('ios safri', isIOSSafari)
        const filename = event.title
        const rawContent = ''
        const href = "#add-to-calendar"
        const url = buildUrl(event, isIOSSafari(), rawContent);
        const blob = new Blob([url], {
            type: "text/calendar;charset=utf-8"
        });

        // IE
        if (isCrappyIE) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
            return;
        }

        // Safari
        if (isIOSSafari()) {
            window.open(url, "_blank");
            return;
        }

        // Desktop
        downloadBlob(blob, filename);
    };

    return (
        <div className='mt-[6rem] font-special'>
            <Calendar
                localizer={localizer}
                events={myEventList}
                defaultDate={defaultStartDate}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => handleClick(event)}
                style={{ height: 'clamp(650px, 80vh, 900px)' }}
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