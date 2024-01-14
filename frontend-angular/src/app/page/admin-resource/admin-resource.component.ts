import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../component/dialog/confirm-dialog/confirm-dialog.component";
import {ResourceType} from "../../model/ResourceType";
import {ResourceDialogComponent} from "../../component/dialog/resource-dialog/resource-dialog.component";
import {ResourceService} from "../../service/resource.service";
import {ToastService} from "angular-toastify";
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-admin-resource',
  templateUrl: './admin-resource.component.html',
  styleUrls: ['./admin-resource.component.css'],
})
export class AdminResourceComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'amount', 'backgroundColor', 'edit', 'delete'];
  dataSource = new MatTableDataSource([] as ResourceType[]);
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private resourceService: ResourceService,
              private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.resourceService.findAll().subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
          },
          error: (err) => {
            console.error(err.message);
          },
        },
    )
  }

  createNewResource() {
    const dialogRef = this.dialog.open(ResourceDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;
      this.resourceService.postResource(result as ResourceType).subscribe({
            next: (res) => {
              const data = this.dataSource.data;
              data.push(res);
              this.dataSource.data = data;
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

  updateRow(row: ResourceType) {
    console.log("admin-resource.component.ts > deleteElement(): " + JSON.stringify(row, null, 2));
    const dialogRef = this.dialog.open(ResourceDialogComponent, { data: row });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (JSON.stringify(row) === JSON.stringify(dialogResult)) {
        console.log("no changes");
        return;
      }
      this.resourceService.updateResource(row.id, dialogResult).subscribe({
            next: (res) => {
              this.dataSource.data = this.dataSource.data.map(item => {
                if (item.id === row.id) return res;
                return item;
              })
              this.toastService.success("Resource updated successfully!");
            },
            error: (err) => {
              console.error(err.message);
            },
          },
      )
    })
  }

  deleteRow(row: ResourceType) {
    console.log("admin-resource.component.ts > deleteElement(): " + JSON.stringify(row, null, 2));
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.resourceService.deleteResource(row.id).subscribe({
              next: (res) => {
                this.dataSource.data = this.dataSource.data.filter(item => item.id != row.id);
                this.toastService.success("Resource deleted successfully!")
              },
              error: (err) => {
                console.error(err.message);
              },
            },
        )
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
