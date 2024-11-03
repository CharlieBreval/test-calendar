export type Column = CalendarEvent[]

export type CalendarEvent = {
    id: number,
    start: Date,
    end: Date,
    duration: number,
    concurrency: number,
    leftOffset: number,
    color: string,
}