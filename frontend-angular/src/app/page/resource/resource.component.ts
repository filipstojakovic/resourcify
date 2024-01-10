import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ResourceType} from '../../model/ResourceType';
import {MatDialog} from '@angular/material/dialog';
import {ResourceService} from '../../service/resource.service';
import {ResourceDialogComponent} from '../../component/dialog/resource-dialog/resource-dialog.component';
import {ResourceEventMapperService} from '../../mapper/resourceEventMapper.service';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
import {calendarConfig} from '../../component/calendar/calendarConfig';
import {DateClickArg} from '@fullcalendar/interaction';
import {ToastService} from 'angular-toastify';
import {ResourceReservationType} from '../../model/ResourceReservationType';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    ...calendarConfig,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  selectedResource: ResourceType | string = "";
  resources: ResourceType[] = [];

  constructor(public dialog: MatDialog,
              private resourceService: ResourceService,
              private resourceEventMapper: ResourceEventMapperService,
              private toastService: ToastService,
              public authService: AuthService,
              private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.getEvents(this.selectedResource);
  }

  onSelectionChange(value: any) {
    this.getEvents(this.selectedResource);
  }

  handleDateClick(arg: DateClickArg) {
    console.log(arg);
    alert(arg.date);
  }

  handleEventClick(arg: EventClickArg) {
    const reservation: ResourceReservationType = arg.event._def.extendedProps['data'];
    const eventData = arg.event._def;
    console.log(arg.event._def);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResourceDialogComponent, { data: null });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;
      this.resourceService.postResource(result as ResourceType).subscribe({
            next: (res) => {
              console.log("resource.component.ts > next(): " + JSON.stringify(res, null, 2));
              this.toastService.success('Resource saved')
            },
            error: (err) => {
              console.error(err.message);
              this.toastService.success('Resource not saved')
            },
          },
      )
    });
  }

  getEvents(resource: ResourceType | string) {
    if (typeof resource === "string") {
      return this.resourceService.findAll().subscribe({
            next: (res) => {
              this.resources = res;
              this.calendarOptions.events = this.resourceEventMapper.mapResourcesToReservationEvents(res);
            },
            error: (err) => {
              console.error(err.message);
              this.toastService.error('Error fetch resources');
            },
          },
      )
    }
    return this.resourceService.findById(resource.id).subscribe({
          next: (res) => {
            this.calendarOptions.events = this.resourceEventMapper.mapResourceToReservationEvents(res);
          },
          error: (err) => {
            console.error(err.message);
            this.toastService.error(`Error fetch resource ${resource.name}`);
          },
        },
    )
  }
}
