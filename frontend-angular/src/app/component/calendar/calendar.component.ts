import {Component, OnInit} from '@angular/core';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
    initialView: 'dayGridMonth',
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
      right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
    },

    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),


    // events: this.events
  };
  // https://fullcalendar.io/docs/event-parsing
  events = [
    {
      id: "123", title: 'Meeting', start: Date.now(), allDay: true,
    },
  ]

  handleDateClick(arg: DateClickArg) {
    console.log(arg);
    alert(arg.date);
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg.event._def);
    alert(arg.event.title);
  }

  ngOnInit(): void {
    this.calendarOptions.events = this.events;
  }
}
