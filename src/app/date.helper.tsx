type TimeInterval = { start: Date, end: Date };

export function addMinutes(date: Date, minutesToAdd: number): Date {
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date
  }

export function areOverlapping(a: TimeInterval, b: TimeInterval): boolean {
    if (a === undefined || b === undefined) return false;
    
    if (a.start <= b.start && b.start < a.end) return true; // b starts in a
    if (a.start < b.end && b.end <= a.end) return true; // b ends in a
    if (b.start < a.start && a.end < b.end) return true; // a in b
    return false;
}

export function sortEvents(a: TimeInterval, b: TimeInterval): number {
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;
    if (a.start.getTime() === b.start.getTime()) {
        if (a.end < b.end) return -1;
        if (a.end > b.end) return 1;
    }
    return 0
}