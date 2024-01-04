import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ResourceDialogComponent} from "../../component/dialog/resource-dialog/resource-dialog.component";
import {ResourceType} from '../../model/ResourceType';
import {ResourceService} from '../../service/resource.service';

interface Food {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  selectedResource: ResourceType;
  resources: ResourceType[] = [];

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

  onSelectionChange(event: any) {

    console.log("home.component.ts > onSelectionChange(): " + JSON.stringify(event, null, 2));
  }

}
