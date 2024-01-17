import {Component, Inject} from '@angular/core';
import {ResourceType} from '../../../model/ResourceType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ResourceService} from '../../../service/resource.service';
import {initResourceReservationReq} from '../../../model/request/ResourceReservationRequest';
import {AuthService} from "../../../service/auth.service";
import {DateValidators} from "../../../validator/DateValidator";
import {Constants} from "../../../constants/constants";
import {UserType} from '../../../model/UserType';
import {UserService} from '../../../service/user.service';
import {ResourceReservationType} from "../../../model/ResourceReservationType";

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
    @Inject(MAT_DIALOG_DATA) public data: ResourceReservationType | null,
    private fb: FormBuilder,
  ) {
    const userId = this.authService.getId();
    this.resourceService.findAll().subscribe(res => this.resources = res);
    if (authService.isAdmin()) {
      this.userService.getAllUsers().subscribe(res => this.users = res);
    } else {
      this.userService.getUserById(userId).subscribe(res => this.users.push(res));
    }
    //TODO: if has data, take that data

    const defaultReservation = initResourceReservationReq();
    defaultReservation.forUserId = userId;
    //TODO: if admin can change userId

    this.resourceReservationForm = this.fb.group({
      forUserId: [defaultReservation.forUserId, Validators.required],
      resourceId: [defaultReservation.resourceId, Validators.required],
      reservationDate: [defaultReservation.reservationDate, [Validators.required, DateValidators.isThisMuchHoursInFuture(Constants.RESERVATION_TIME_DIFFERENCE)]],
      description: [defaultReservation.description, Validators.required],
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
}
