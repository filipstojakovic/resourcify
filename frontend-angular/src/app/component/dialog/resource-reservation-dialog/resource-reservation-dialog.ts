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
import {ResourceReservationType} from "../../../model/ResourceReservationType";
import {ResourceReservationService} from '../../../service/resource-reservation.service';
import {ToastService} from 'angular-toastify';

export type ResourceReservationDialogType = {
  resourceReservation?: ResourceReservationType;
  date?: Date
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
      @Inject(MAT_DIALOG_DATA) public data: ResourceReservationDialogType | null,
      private fb: FormBuilder,
  ) {
    //TODO: if not admin && had data => lock all fields

    let displayReservation: ResourceReservationRequest = initResourceReservationReq();
    if (data?.date) {
      displayReservation.reservationDate = data.date;
    }
    displayReservation.forUserId = this.authService.getId();

    this.resourceService.findAll().subscribe(res => {
      this.resources = res;
      if (data != null && data.resourceReservation != null) {
        const resource = this.resources.find(resource => resource.name === data.resourceReservation.resourceName);
        displayReservation.resourceId = resource.id;
        this.resourceReservationForm?.controls['resourceId']?.setValue(resource.id);
      }
    })

    if (data?.resourceReservation != null) {
      displayReservation.forUserId = data.resourceReservation.user.id;
      displayReservation.description = data.resourceReservation.description;
      displayReservation.reservationDate = data.resourceReservation.reservationDate;
      if (this.authService.isAdmin()) {
        this.userService.getAllUsers().subscribe(res => this.users = res);
        //ima podataka i admin je
      } else {
        this.users.push(data.resourceReservation.user);
        //ima podataka ali nije admin
      }
    } else {
      if (this.authService.isAdmin()) {
        this.userService.getAllUsers().subscribe(res => this.users = res);
        //nema podataka ali je admin
      } else {
        this.userService.getUserById(this.authService.getId()).subscribe(res => this.users.push(res));
        //nema podataka, ali nije admin
      }
    }

    this.resourceReservationForm = this.fb.group({
      forUserId: [{
        value: displayReservation.forUserId,
        disabled: !this.isAllowedToChange(),
      }, Validators.required],
      resourceId: [{
        value: displayReservation.resourceId,
        disabled: !this.isAllowedToChange(),
      }, Validators.required],
      reservationDate: [
        { value: displayReservation.reservationDate, disabled: !this.isAllowedToChange() },
        [Validators.required, DateValidators.isThisMuchHoursInFuture(Constants.RESERVATION_TIME_DIFFERENCE)],
      ],
      description: [{
        value: displayReservation.description,
        disabled: !this.isAllowedToChange(),
      }, Validators.required],
    });
  }

  onCancelClicked(): void {
    this.dialogRef.close(null);
  }

  onSaveClicked() {
    if (this.resourceReservationForm.valid) {
      this.dialogRef.close(this.resourceReservationForm.value);
    }
  }

  isDeleteAllowed() {
    if (this.data?.resourceReservation) {
      if (this.authService.isAdmin())
        return true;
      return this.authService.getId() === this.data.resourceReservation.user.id;
    }
    return false;
  }

  isAllowedToChange() {
    if (this.authService.isAdmin())
      return true;

    return this.data == null || this.data.resourceReservation == null || this.data.date != null;
  }

  deleteReservation() {
    const resourceReservation = this.data.resourceReservation;
    this.dialogRef.close({
      delete:true,
      data: resourceReservation
    });
  }
}
