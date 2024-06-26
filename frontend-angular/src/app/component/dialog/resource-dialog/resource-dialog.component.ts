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
  backgroundColor = "";
  toggle: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<ResourceDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ResourceType,
      private fb: FormBuilder,
  ) {
    const resource = data || initResource();
    this.backgroundColor = resource.backgroundColor;
    this.resourceForm = this.fb.group({
      name: [resource.name, Validators.required],
      description: [resource.description],
      amount: [resource.amount, [Validators.required, Validators.min(1)]],
      backgroundColor: [resource.backgroundColor],
    });
  }

  onCancelClicked(): void {
    this.dialogRef.close(null);
  }

  onSaveClicked() {
    if (this.resourceForm.valid) {
      console.log("resource-dialog.component.ts > onSaveClicked(): " + JSON.stringify(this.resourceForm.value, null, 2));
      this.dialogRef.close(this.resourceForm.value);
    }
  }

  public onChangeColor(backgroundColor: string): void {
    this.backgroundColor = backgroundColor;
    this.resourceForm.patchValue({ backgroundColor });
  }

}
