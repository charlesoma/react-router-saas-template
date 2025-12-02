export type CalendarEvent = {
  id: number;
  date: string;
  title: string;
  startHour: number;
  endHour: number;
};

export type CalendarEventWithLayout = CalendarEvent & {
  lane: number;
  laneCount: number;
};

export const CALENDAR_HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

export function formatHour(hour: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = ((hour + 11) % 12) + 1;
  return `${h12} ${period}`;
}

export function formatDateLabel(date: Date) {
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
}

export function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getEventTimeColorClass(event: CalendarEvent, now: Date) {
  const padHour = (h: number) => h.toString().padStart(2, "0");
  const eventStart = new Date(
    `${event.date}T${padHour(event.startHour)}:00:00`,
  );
  const eventEnd = new Date(`${event.date}T${padHour(event.endHour)}:00:00`);

  if (eventEnd < now) {
    return "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/40 dark:border-red-400 dark:text-red-300";
  }

  if (eventStart > now) {
    return "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/40 dark:border-blue-400 dark:text-blue-300";
  }

  return "bg-indigo-50 dark:bg-indigo-900/40 border-l-4 border-indigo-400 text-indigo-700 dark:text-indigo-300";
}

export function assignEventLanes(
  events: CalendarEvent[],
): CalendarEventWithLayout[] {
  if (events.length === 0) return [];

  const sorted = [...events].sort((a, b) => {
    if (a.startHour !== b.startHour) return a.startHour - b.startHour;
    return a.endHour - b.endHour;
  });

  const laneEndHours: number[] = [];
  const withLanes: CalendarEventWithLayout[] = [];

  for (const event of sorted) {
    let laneIndex = laneEndHours.findIndex((end) => end <= event.startHour);
    if (laneIndex === -1) {
      laneIndex = laneEndHours.length;
      laneEndHours.push(event.endHour);
    } else {
      laneEndHours[laneIndex] = event.endHour;
    }

    withLanes.push({
      ...event,
      lane: laneIndex,
      laneCount: 0,
    });
  }

  const totalLanes = laneEndHours.length || 1;

  return withLanes.map((event) => ({
    ...event,
    laneCount: totalLanes,
  }));
}
