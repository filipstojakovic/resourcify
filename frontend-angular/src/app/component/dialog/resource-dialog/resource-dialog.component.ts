import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {initResource, ResourceType} from '../../../model/ResourceType';

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
    const resource = data || initResource();
    this.resourceForm = this.fb.group({
      name: [resource.name, Validators.required],
      amount: [resource.amount, [Validators.required, Validators.min(1)]],
      backgroundColor: [resource.backgroundColor],
      description: [resource.description],
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
