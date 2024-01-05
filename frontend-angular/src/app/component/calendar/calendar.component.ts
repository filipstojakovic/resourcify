import {Component, Input, OnInit} from '@angular/core';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
import {DateClickArg} from '@fullcalendar/interaction';
import {calendarConfig} from './calendarConfig';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    ...calendarConfig,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    // events: this.events
  };

  @Input() events: any[] = [];

  // <link>https://fullcalendar.io/docs/event-parsing</link>
  ngOnInit(): void {
    this.calendarOptions.events = this.events;
  }

  handleDateClick(arg: DateClickArg) {
    console.log(arg);
    alert(arg.date);
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg.event._def);
    alert(arg.event.title);
  }

}
