import { areOverlapping, sortEvents } from "./date.helper";
import { CalendarEvent, Column } from "./types";

/**
 * Concurrency (how many event are overlapping at the same time)
 * is key to determine the width of each event
 */
export function computeConcurrency(events: CalendarEvent[]) {
    events.sort(sortEvents)

    // sliding window will help to compute event concurrency, in fine, the width of the event
    const slidingWindow: CalendarEvent[] = [];

    for (let i = 0; i < events.length; i++) {
        const currEvent = events[i];
        slidingWindow.push(currEvent)

        // update the sliding window
        for (let i = slidingWindow.length - 1; i >= 0; i--) {
            if (!areOverlapping(currEvent, slidingWindow[i])) {
                slidingWindow.splice(i, 1);
            }
        }

        // update concurrency for each element of the sliding window
        for (let u = 0; u < slidingWindow.length; u++) {
            if (slidingWindow.length > (slidingWindow[u].concurrency ?? 0)) {
                slidingWindow[u].concurrency = slidingWindow.length;
            }
        }

    }

    return events
}
