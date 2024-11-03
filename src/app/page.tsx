'use client'

import Image from "next/image";
import data from './input.json'
import { CalendarEvent } from "./types";
import { Calendar } from "./Calendar";
import { computeConcurrency } from "./computeConcurrency";
import { computeLeftOffset } from "./computeLeftOffset";
import { useEffect, useState } from "react";
import { addMinutes } from "./date.helper";
import { pickRandomColor } from "./colors";

function loadCalendarEvents(): CalendarEvent[] {
  const calendarEvents = data.map((raw) => {
    const hours = parseInt(raw.start.substring(0, 2));
    const minutes = parseInt(raw.start.substring(3, 5));
    const start = new Date(); start.setHours(hours, minutes, 0);
    const end = addMinutes(new Date(start), raw.duration)

    return {
      id: raw.id,
      start,
      end,
      duration: raw.duration,
      concurrency: 1,
      leftOffset: 0,
      color: pickRandomColor()
    }
  })

  // Beware, events are updated in-place
  computeConcurrency(calendarEvents);
  computeLeftOffset(calendarEvents);

  return calendarEvents;
}

export default function Home() {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const calendarEvents = loadCalendarEvents();
    setCalendarEvents(calendarEvents);
  }, [])

  return (
    <div>
      <Calendar calendarEvents={calendarEvents} />
    </div>
  );
}
