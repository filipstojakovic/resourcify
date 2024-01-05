import {Component, OnInit} from '@angular/core';
import {ResourceType} from '../../model/ResourceType';
import {MatDialog} from '@angular/material/dialog';
import {ResourceService} from '../../service/resource.service';
import {ResourceDialogComponent} from '../../component/dialog/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {

  selectedResource: ResourceType | string = "";
  resources: ResourceType[] = [];

  events = [
    {
      id: "123", title: 'Meeting', start: Date.now(), allDay: true, backgroundColor: "#FF0000"
    },
  ]

  constructor(public dialog: MatDialog, private resourceService: ResourceService) {
  }

  ngOnInit(): void {
    this.resourceService.findAll().subscribe({
          next: (res) => {
            this.resources = res;
          },
          error: (err) => {
            console.error(err.message);
          },
        },
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResourceDialogComponent, {
      data: { name: "asd", description: "qwe" } as ResourceType,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;
      console.log('The dialog was closed');
      console.log("home.component.ts > after result(): " + JSON.stringify(result, null, 2));
    });
  }

  onSelectionChange(value: any) {

    if ("" === value) {
      //TODO: all selected
    } else {

    }
    console.log("home.component.ts > onSelectionChange(): " + JSON.stringify(value, null, 2));
  }

}
