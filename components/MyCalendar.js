'use client'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/de'
import 'moment/locale/zh-tw'
import 'moment/locale/en-ca'
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../app/calendar.scss'




export default function MyCalendar(props) {
    moment.locale('zh-tw')
    const localizer = momentLocalizer(moment)
    const myEventsList = [
        {
            start: moment().toDate(),
            end: moment()
                // .add(1, "days")
                .toDate(),
            title: "Some title"
        }
    ]
    return (
        <div className='mt-[6rem] font-special'>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => null}
                style={{ height: 500 }}
                messages={{
                    today: 'this day',
                    previous: '<',
                    next: '>',
                    // yesterday: 'CK',
                    month: 'My month word',
                    week: 'my week',
                    day: 'My day word',
                    agenda: 'my agenda'
                  }}
            />
        </div>
    )
}