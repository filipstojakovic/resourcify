import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ResourceReservationType} from '../../model/ResourceReservationType';
import {MatDialog} from '@angular/material/dialog';
import {ResourceService} from '../../service/resource.service';
import {ResourceType} from '../../model/ResourceType';
import {AuthService} from '../../service/auth.service';
import {ResourceReservationService} from '../../service/resource-reservation.service';
import {ToastService} from 'angular-toastify';
import {ConfirmDialogComponent} from "../../component/dialog/confirm-dialog/confirm-dialog.component";
import {StatusEnum} from "../../model/NotificationMessage";
import {NotificationEmitterService} from '../../service/notification-emitter.service';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.css'],
})
export class UserReservationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'resourceName', 'description', 'date', 'status', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  resources: ResourceType[] = [];
  dataSource = new MatTableDataSource([] as ResourceReservationType[]);

  constructor(public dialog: MatDialog,
              private resourceService: ResourceService,
              private resourceReservationService: ResourceReservationService,
              private authService: AuthService,
              private toastService: ToastService,
              private notificationEmitterService: NotificationEmitterService,
  ) {
    this.notificationEmitterService.eventEmitter.subscribe(async () => {
      console.log("user-reservation.component.ts > event emitter callback(): " + "");
      await this.ngOnInit();
    })
  }

  async ngOnInit() {
    const userId = await this.authService.getIdAsync();
    this.resourceService.findByUserId(userId).subscribe({
          next: (result) => {
            this.resources = result;
            this.dataSource.data = this.resources.flatMap(resource => resource.reservations);
            this.dataSource.sortingDataAccessor = this.customFullNameSort;
            this.dataSource.filterPredicate = this.dataSourceFilter;
            this.dataSource.sort = this.sort;
          },
          error: (err) => {
            console.error(err.message);
          },
        },
    )
  }

  deleteReservation(row: ResourceReservationType) {
    const resource = this.resources.find(x => x.name == row.resourceName);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) {
        return;
      }
      this.resourceReservationService.deleteUserResourceReservation(resource.id, row.reservationId).subscribe({
            next: (res) => {
              this.toastService.success("Reservation deleted");
              this.dataSource.data = this.dataSource.data.filter(x => x.reservationId !== row.reservationId);
            },
            error: (err) => {
              console.error(err.message);
            },
          },
      )
    });
  }

  customFullNameSort(item: ResourceReservationType, property: string) {
    switch (property) {
      case 'name':
        return item.user.firstName + " " + item.user.lastName;
      case 'date':
        return item.fromDate;
      default:
        return (item as any)[property];
    }
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataSourceFilter(data: ResourceReservationType, filter: string) {
    const lowercaseFilter = filter.trim().toLowerCase();

    for (const key in data) {
      if (data.hasOwnProperty(key) && typeof (data as any)[key] === 'string') {
        const lowercaseValue = (data as any)[key].toLowerCase();
        if (lowercaseValue.includes(lowercaseFilter)) {
          return true;
        }
      }
    }

    if (data.user) {
      const fullName = (data.user.firstName + " " + data.user.lastName).toLowerCase();
      if (fullName.includes(lowercaseFilter)) {
        return true;
      }
    }

    return false;
  }

  protected readonly StatusEnum = StatusEnum;
}
