import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

export const calendarConfig: CalendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin, listPlugin],
  contentHeight: "auto",
  initialView: 'dayGridMonth',
  fixedWeekCount: false, // If true, the calendar will always be 6 weeks
  firstDay: 1, // Monday
  eventTimeFormat: {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  },
  selectable: true,
  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'today dayGridMonth,dayGridWeek,listWeek',
  },
}
