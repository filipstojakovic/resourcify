import {Component, OnInit, ViewChild} from '@angular/core';
import {ResourceType} from '../../model/ResourceType';
import {MatDialog} from '@angular/material/dialog';
import {ResourceService} from '../../service/resource.service';
import {ResourceEventMapperService} from '../../mapper/resourceEventMapper.service';
import {CalendarOptions, DateSelectArg, EventClickArg} from '@fullcalendar/core';
import {calendarConfig} from '../../component/calendar/calendarConfig';
import {DateClickArg} from '@fullcalendar/interaction';
import {ToastService} from 'angular-toastify';
import {ResourceReservationType} from '../../model/ResourceReservationType';
import {
  ResourceReservationDialog,
} from '../../component/dialog/resource-reservation-dialog/resource-reservation-dialog';
import {ResourceReservationService} from '../../service/resource-reservation.service';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import dateTimeUtil from '../../util/dateTimeUtil';
import {NotificationEmitterService} from '../../service/notification-emitter.service';
import {addDays, addHours} from "date-fns";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {

  @ViewChild('select') select?: MatSelect;
  @ViewChild('button') button?: MatButton;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  loading: boolean = true;

  calendarOptions: CalendarOptions = {
    ...calendarConfig,
    // dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    select: this.handleSelectMultipleDatesEvent.bind(this),
    datesSet: this.handleDatesSet.bind(this),
  };

  selectedResource: ResourceType | string = "";
  resources: ResourceType[] = [];

  constructor(public dialog: MatDialog,
              private resourceEventMapper: ResourceEventMapperService,
              private resourceService: ResourceService,
              private resourceReservationService: ResourceReservationService,
              private toastService: ToastService,
              private notificationEmitterService: NotificationEmitterService,
  ) {
    this.notificationEmitterService.eventEmitter.subscribe(() => this.ngOnInit());
  }

  ngOnInit(): void {
    this.getEvents(this.selectedResource);
  }

  onSelectionChange(value: any) {
    this.getEvents(this.selectedResource);
    this.select.close();
  }

  // handleDateClick(arg: DateClickArg) {
  //   console.log(arg);
  //   const start = dateTimeUtil.combineDateWithCurrentTime(arg.date);
  //   const end = addHours(start, 8);
  //   const dialogRef = this.dialog.open(ResourceReservationDialog, { data: { date: { start, end } } });
  //   dialogRef.afterClosed().subscribe(result => this.createReservation(result));
  // }

  handleSelectMultipleDatesEvent(arg: DateSelectArg) {
    const start: Date = dateTimeUtil.combineDateWithCurrentTime(arg.start);
    const end: Date = dateTimeUtil.combineDateWithCurrentTime(addDays(arg.end, -1));
    const dialogRef = this.dialog.open(ResourceReservationDialog, { data: { date: { start, end } } });
    dialogRef.afterClosed().subscribe(result => this.createReservation(result));
  }

  //update event if can
  handleEventClick(arg: EventClickArg) {
    const resourceReservation: ResourceReservationType = arg.event._def.extendedProps['data'];
    // console.log(arg.event._def);
    const dialogRef = this.dialog.open(ResourceReservationDialog, { data: { resourceReservation } });

    dialogRef.afterClosed().subscribe(result => {

      if (result == null) {
        return;
      }
      if (result.delete == true) {
        const resource = this.resources.find(x => x.name === result.data.resourceName);
        this.resourceReservationService.deleteUserResourceReservation(resource.id, result.data.reservationId).subscribe({
              next: (res) => {
                const calendarApi = this.fullcalendar.getApi();
                const eventToRemove = calendarApi.getEventById(result.data.reservationId);

                if (eventToRemove) {
                  eventToRemove.remove();
                  this.toastService.success("Reservation deleted!");
                }
              },
              error: (err) => {
                console.error(err.message);
              },
            },
        )
      } else {
        this.resourceReservationService.updateResourceReservation(resourceReservation.reservationId, result.data).subscribe({
              next: (res) => {
                this.toastService.success("Reservation updated!")
                const calendarApi = this.fullcalendar.getApi();
                const eventToRemove = calendarApi.getEventById(resourceReservation.reservationId);
                //TODO: update event
              },
              error: (err) => {
                console.error(err.message);
              },
            },
        )
      }
    });

  }

  getEvents(resource: ResourceType | string) {
    this.loading = true;
    if (typeof resource === "string") {
      return this.resourceService.findAll().subscribe({
            next: (res) => {
              this.resources = res;
              this.calendarOptions.events = this.resourceEventMapper.mapResourcesToReservationEvents(res);
              this.loading = false;
            },
            error: (err) => {
              console.error(err.message);
              this.toastService.error('Error fetch resources');
              this.loading = false;
            },
          },
      )
    }
    return this.resourceService.findById(resource.id).subscribe({
          next: (res) => {
            this.calendarOptions.events = this.resourceEventMapper.mapResourceToReservationEvents(res);
            this.loading = false;
          },
          error: (err) => {
            console.error(err.message);
            this.toastService.error(`Error fetch resource ${resource.name}`);
            this.loading = false;
          },
        },
    )
  }

  openReservationDialog() {
    const dialogRef = this.dialog.open(ResourceReservationDialog, { data: null });
    dialogRef.afterClosed().subscribe(result => this.createReservation(result));
  }

  private createReservation(result: any) {
    if (result == null) {
      return;
    }
    if (result.update) {

    } else {
      this.resourceReservationService.createResourceReservationReq(result.data).subscribe({
            next: (res) => {
              // const resource = this.resources.find(resource => resource.name === res.resourceName);
              // const resourceEvent = this.resourceEventMapper.mapReservationToEventReservation(res, resource);
              // this.fullcalendar.getApi().addEvent(resourceEvent);
              this.toastService.info("Reservation is waiting for approval");
            },
            error: (err) => {
              console.error(err.message);
            },
          },
      )
    }
  }

  handleDatesSet(info: any) {
    const firstVisibleCalendarDay = info.start;
    const lastVisibleCalendarDay = info.end;
    // console.log("resource.component.ts > handleDatesSet(): " + JSON.stringify({
    //   firstVisibleCalendarDay,
    //   lastVisibleCalendarDay,
    // }, null, 2));
  }
}
