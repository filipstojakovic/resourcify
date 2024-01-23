import {NgModule} from '@angular/core';
import {
  NgxMatDateAdapter,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import {
  NgxMatMomentAdapter,
  NgxMatMomentModule,
  NgxMomentDateModule,
} from '@angular-material-components/moment-adapter';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE} from '@angular/material/core';

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
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    NgxMomentDateModule,
    NgxMatDatetimePickerModule,
  ],
  exports: [
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    NgxMomentDateModule,
    NgxMatDatetimePickerModule,
  ],
  providers: [
    // { provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {provide: MAT_DATE_LOCALE, useValue: 'bs'},
    {provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter},
  ],
})
export class NgxMaterialModule {
}
