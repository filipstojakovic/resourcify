import {NgModule} from '@angular/core';
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule, NgxMomentDateModule} from '@angular-material-components/moment-adapter';
import {MatDatepickerModule} from "@angular/material/datepicker";

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS',
  },
  display: {
    dateInput: 'DD/MM/YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    MatDatepickerModule,
    NgxMomentDateModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
  ],
  exports: [
    MatDatepickerModule,
    NgxMomentDateModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
  ],
  providers: [
    {provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
  ],
})
export class NgxMaterialModule {
}
