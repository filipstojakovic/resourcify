import {Component, Inject} from '@angular/core';
import {ResourceType} from '../../../model/ResourceType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ResourceService} from '../../../service/resource.service';
import {
  initResourceReservationReq,
  ResourceReservationRequest,
} from '../../../model/request/ResourceReservationRequest';
import {AuthService} from "../../../service/auth.service";
import {DateValidators} from "../../../validator/DateValidator";
import {Constants} from "../../../constants/constants";
import {UserType} from '../../../model/UserType';
import {UserService} from '../../../service/user.service';

export type ResourceReservationDialogData = {
  resourceReservationReq: ResourceReservationRequest,
  isAdmin: boolean;
}

@Component({
  selector: 'app-resource-reservation-dialog',
  templateUrl: './resource-reservation-dialog.html',
  styleUrls: ['./resource-reservation-dialog.css'],
})
export class ResourceReservationDialog {

  minDate = new Date();
  resources: ResourceType[] = [];
  users: UserType[] = [];
  resourceReservationForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<ResourceReservationDialog>,
      private resourceService: ResourceService,
      private authService: AuthService,
      private userService: UserService,
      @Inject(MAT_DIALOG_DATA) public data: ResourceReservationDialogData,
      private fb: FormBuilder,
  ) {
    const userId = this.authService.getId();
    this.resourceService.findAll().subscribe(res => this.resources = res);
    if (authService.isAdmin()) {
      this.userService.getAllUsers().subscribe(res => this.users = res);
    } else {
      this.userService.getUserById(userId).subscribe(res => this.users.push(res));
    }

    const defaultReservation = (data && data.resourceReservationReq) || initResourceReservationReq();
    defaultReservation.userId = userId;
    //TODO: if admin can change userId

    this.resourceReservationForm = this.fb.group({
      userId: [defaultReservation.userId, Validators.required],
      selectedResourceId: [defaultReservation.resourceId, Validators.required],
      date: [defaultReservation.date, [Validators.required, DateValidators.isThisMuchHoursInFuture(Constants.RESERVATION_TIME_DIFFERENCE)]],
      description: [defaultReservation.description, Validators.required],
    });
  }

  onCancelClicked(): void {
    this.dialogRef.close(null);
  }

  onSaveClicked() {
    console.log("ResourceReservationDialog > onSaveClicked(): " + JSON.stringify(this.resourceReservationForm.value, null, 2));
    if (this.resourceReservationForm.valid) {
      this.dialogRef.close(this.resourceReservationForm.value);
    }
  }


}
