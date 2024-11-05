import { areOverlapping } from "./date.helper";
import { CalendarEvent } from "./types";

// We are setting up 6 columns, allowing to dispatch events with harmony
const COLUMNS_COUNT = 100;

export function computeLeftOffset(events: CalendarEvent[]) {
    const columns: CalendarEvent[][] = Array.from(Array(COLUMNS_COUNT)).map((_) => []);

    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const eventWidth = columns.length / event.concurrency;

        let hasFoundColumn = false;
        for (let j = 0; j < columns.length && !hasFoundColumn; j++) {
            const currentCol = columns[j];
            const lastColumnEvent = currentCol[currentCol.length - 1]

            if (!areOverlapping(lastColumnEvent, event)) {
                events[i].leftOffset = (j / COLUMNS_COUNT);

                // Fill our grid with the event we are placing
                let maxLimit = (j + Math.floor(eventWidth));
                
                
                for (let u = j; u < maxLimit; u++) {
                    columns[u].push(event);
                }
                hasFoundColumn = true;
            }
        }
    }

    return columns;
}