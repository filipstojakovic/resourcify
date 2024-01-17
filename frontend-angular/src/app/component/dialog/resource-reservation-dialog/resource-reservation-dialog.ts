import {Component, Inject, ViewChild} from '@angular/core';
import {ResourceType} from '../../../model/ResourceType';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ResourceService} from '../../../service/resource.service';
import {
  initResourceReservationReq,
  ResourceReservationRequest,
} from '../../../model/request/ResourceReservationRequest';
import {DateValidators} from "../../../validator/DateValidator";
import {Constants} from "../../../constants/constants";
import {AuthService} from "../../../service/auth.service";
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-resource-reservation-dialog',
  templateUrl: './resource-reservation-dialog.html',
  styleUrls: ['./resource-reservation-dialog.css'],
})
export class ResourceReservationDialog {

  @ViewChild('picker', { static: true }) picker: any;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disableMinute = false;
  public hideTime = false;

  public dateControl = new FormControl(new Date());

  resources: ResourceType[] = [];
  resourceReservationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ResourceReservationDialog>,
    private resourceService: ResourceService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: ResourceReservationRequest,
    private fb: FormBuilder,
  ) {
    this.resourceService.findAll().subscribe(res => this.resources = res);

    const defaultReservation = data || initResourceReservationReq();
    defaultReservation.userId = this.authService.getId();
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
