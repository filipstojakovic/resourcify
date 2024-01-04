import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResourceType} from '../../../model/ResourceType';

@Component({
  selector: 'app-resource-dialog',
  templateUrl: './resource-dialog.component.html',
  styleUrls: ['./resource-dialog.component.css'],
})
export class ResourceDialogComponent {

  resourceForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<ResourceDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ResourceType,
      private fb: FormBuilder,
  ) {
    this.resourceForm = this.fb.group({
      name: [data ? data.name : '', Validators.required],
      description: [data ? data.description : ''],
    });
  }

  onCancelClicked(): void {
    this.dialogRef.close(null);
  }

  onSaveClicked() {
    if (this.resourceForm.valid) {
      this.dialogRef.close(this.resourceForm.value);
    }
  }


}
