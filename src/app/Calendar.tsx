import { CalendarEvent } from "./types";

const CALENDAR_START_HOUR = 9;
const CALENDAR_END_HOUR = 21;
const HOURS_DISPLAYED = CALENDAR_END_HOUR - CALENDAR_START_HOUR;
const MINUTES_DISPLAYED = HOURS_DISPLAYED * 60;

export const Event = ({ event }: { event: CalendarEvent }) => {
    const eventStartInMinutes = event.start.getHours() * 60 + event.start.getMinutes() - (CALENDAR_START_HOUR * 60);
    const verticalOffsetPercentage = eventStartInMinutes * 100 / MINUTES_DISPLAYED;
    const heightPercentage = event.duration * 100 / MINUTES_DISPLAYED;

    return (<div className="event" style={{
        top: `${verticalOffsetPercentage}%`,
        height: `${heightPercentage}%`,
        width: `${((100 / (event.concurrency)).toFixed(2) ?? 1)}%`,
        left: `${(event.leftOffset ?? 0) * 100}%`,
        backgroundColor: `${event.color}`
    }}><div className="eventContent">{event.id}</div></div>)
}

export const Calendar = ({ calendarEvents }: { calendarEvents: CalendarEvent[] }) => {
    return (<div className="calendarWrapper">
        <div className="bars">
            {Array((HOURS_DISPLAYED - 1)).fill(null).map((_, idx) => {
                const verticalOffset = (idx + 1) * 100 / HOURS_DISPLAYED;
                return <div key={idx} className="bar" style={{top: `${verticalOffset}%`}}></div>
            })}
        </div>
        <div className="events">
            {calendarEvents.map((event, idx) => {
                return <Event key={idx} event={event} />
            })}
        </div>
    </div>)

}