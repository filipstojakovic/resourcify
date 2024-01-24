import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ResourceType} from '../../model/ResourceType';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ResourceService} from '../../service/resource.service';
import {ToastService} from 'angular-toastify';
import {ResourceReservationType} from '../../model/ResourceReservationType';
import {ResourceReservationService} from '../../service/resource-reservation.service';

@Component({
  selector: 'app-resource-reservation-approval',
  templateUrl: './admin-resource-reservation.component.html',
  styleUrls: ['./admin-resource-reservation.component.css'],
})
export class AdminResourceReservationComponent implements OnInit {

  displayedColumns: string[] = ['name', 'resourceName', 'description', 'date', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([] as ResourceReservationType[]);

  resources: ResourceType[] = [];

  constructor(public dialog: MatDialog,
              private resourceService: ResourceService,
              private resourceReservationService: ResourceReservationService,
              private toastService: ToastService,
  ) {

  }

  ngOnInit() {
    this.resourceService.findAll().subscribe({
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


  changeApproval(row: ResourceReservationType) {
    const resource = this.resources.find(resource => resource.name == row.resourceName);
    this.resourceReservationService.handleResourceReservationApproval(resource.id, row.reservationId).subscribe({
          next: (res) => {
            const reservations = this.dataSource.data;
            this.dataSource.data = reservations.map(reservation => {
              if (reservation.reservationId === row.reservationId)
                return res;
              return reservation;
            });
          },
          error: (err) => {
            console.error(err.message);
          },
        },
    )
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

}
