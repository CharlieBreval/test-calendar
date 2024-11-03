export type Column = CalendarEvent[]

export type CalendarEvent = {
    id: number,
    start: Date, // timestamp
    end: Date, // timestamp
    duration: number,
    concurrency: number,
    leftOffset: number,
    color: string,
}