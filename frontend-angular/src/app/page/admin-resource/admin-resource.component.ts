import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../component/dialog/confirm-dialog/confirm-dialog.component";
import {ResourceType} from "../../model/ResourceType";
import {ResourceDialogComponent} from "../../component/dialog/resource-dialog/resource-dialog.component";
import {ResourceService} from "../../service/resource.service";
import {ToastService} from "angular-toastify";

const ELEMENT_DATA: ResourceType[] = [
  {
    name: "Wood",
    description: "A renewable resource used for construction",
    amount: 100,
    backgroundColor: "#8B4513", // Brown color
  },
  {
    name: "Iron Ore",
    description: "Raw material for producing iron and steel",
    amount: 50,
    backgroundColor: "#43464B", // Dark gray color
  },
  {
    name: "Gold",
    amount: 10,
    description: "Raw material for producing iron and steel",
    backgroundColor: "#FFD700", // Gold color
  },
];

@Component({
  selector: 'app-admin-resource',
  templateUrl: './admin-resource.component.html',
  styleUrls: ['./admin-resource.component.css'],
})
export class AdminResourceComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'amount', 'backgroundColor', 'edit', 'delete'];
  dataSource = new MatTableDataSource([]);


  constructor(public dialog: MatDialog, private resourceService: ResourceService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.resourceService.findAll().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
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

  editRow(row: ResourceType) {
    console.log("admin-resource.component.ts > deleteElement(): " + JSON.stringify(row, null, 2));
    const dialogRef = this.dialog.open(ResourceDialogComponent, {data: row});
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log("admin-resource.component.ts > edit dialog");
      //TODO: update resource
    })
  }

  deleteRow(row: ResourceType) {
    console.log("admin-resource.component.ts > deleteElement(): " + JSON.stringify(row, null, 2));
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log("admin-resource.component.ts > " + "she said yes!");
        //TODO: delete resource
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
