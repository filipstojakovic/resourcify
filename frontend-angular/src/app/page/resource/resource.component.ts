import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ResourceType} from '../../model/ResourceType';
import {MatDialog} from '@angular/material/dialog';
import {ResourceService} from '../../service/resource.service';
import {ResourceEventMapperService} from '../../mapper/resourceEventMapper.service';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';
import {calendarConfig} from '../../component/calendar/calendarConfig';
import {DateClickArg} from '@fullcalendar/interaction';
import {ToastService} from 'angular-toastify';
import {ResourceReservationType} from '../../model/ResourceReservationType';
import {AuthService} from "../../service/auth.service";
import {
  ResourceReservationDialog,
} from '../../component/dialog/resource-reservation-dialog/resource-reservation-dialog';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {

  loading: boolean = true;

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
              private changeDetector: ChangeDetectorRef, //TODO: mozda ce trebati
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

    dialogRef.afterClosed().subscribe(result => {
      console.log("resource.component.ts > (): "+ JSON.stringify(result, null, 2));
      if (result == null)
        return;
    });
  }
}
