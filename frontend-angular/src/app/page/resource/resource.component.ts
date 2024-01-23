import {Component, OnInit, ViewChild} from '@angular/core';
import {ResourceType} from '../../model/ResourceType';
import {MatDialog} from '@angular/material/dialog';
import {ResourceService} from '../../service/resource.service';
import {ResourceEventMapperService} from '../../mapper/resourceEventMapper.service';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
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
import {ResourceReservationRequest} from '../../model/request/ResourceReservationRequest';

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
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  selectedResource: ResourceType | string = "";
  resources: ResourceType[] = [];

  constructor(public dialog: MatDialog,
              private resourceEventMapper: ResourceEventMapperService,
              private resourceService: ResourceService,
              private resourceReservationService: ResourceReservationService,
              private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.getEvents(this.selectedResource);
  }

  onSelectionChange(value: any) {
    this.getEvents(this.selectedResource);
    this.select.close();
  }

  handleDateClick(arg: DateClickArg) {
    console.log(arg);
    const date = dateTimeUtil.combineDateWithCurrentTime(arg.date);
    const dialogRef = this.dialog.open(ResourceReservationDialog, {data: {date: date}});
    dialogRef.afterClosed().subscribe(result => this.createReservation(result));
  }

  handleEventClick(arg: EventClickArg) {
    // console.log(arg.event._def);
    const reservation: ResourceReservationType = arg.event._def.extendedProps['data'];
    const dialogRef = this.dialog.open(ResourceReservationDialog, {data: {resourceReservation: reservation}});

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
        // TODO: update
        console.log("resource.component.ts > update event():");
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
    const dialogRef = this.dialog.open(ResourceReservationDialog, {data: null});
    dialogRef.afterClosed().subscribe(result => this.createReservation(result));
  }

  private createReservation(result: ResourceReservationRequest) {
    if (result == null) {
      return;
    }
    this.resourceReservationService.createResourceReservationReq(result).subscribe({
        next: (res) => {
          const resource = this.resources.find(resource => resource.name === res.resourceName);
          const resourceEvent = this.resourceEventMapper.mapReservationToEventReservation(res, resource);
          this.fullcalendar.getApi().addEvent(resourceEvent);
          this.toastService.info("Reservation is waiting for approval");
        },
        error: (err) => {
          console.error(err.message);
        },
      },
    )
  }
}
