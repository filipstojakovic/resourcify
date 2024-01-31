import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {addHours, isAfter} from "date-fns";
import dateTimeUtil from '../util/dateTimeUtil';

export class DateValidators {

  static isThisMuchHoursInFuture(hours: number): ValidatorFn {
    return (selectedDateControl: AbstractControl): ValidationErrors | null => {

      let selectedDate = dateTimeUtil.convertFormControlMomentToDate(selectedDateControl);
      const futureDate: Date = addHours(new Date(), hours);

      if (!isAfter(selectedDate, futureDate)) {
        return { dateNotValid: true };
      }
      return null;
    };
  }

  static dateLessThanValidator(fromDateControlName: string) {

    let toDateControl: AbstractControl;
    let fromDateControl: AbstractControl;

    return function DateLessThanOrEqualsValidate(control: AbstractControl): ValidationErrors {
      if (!control.parent) {
        return null;
      }
      if (!toDateControl) {
        toDateControl = control;
        fromDateControl = control.parent.get(fromDateControlName) as AbstractControl;
        if (!fromDateControl) {
          throw new Error('dateLessThanOrEqualsValidator(): other control is not found in parent group');
        }
      }
      if (!fromDateControl || !fromDateControl.value) {
        return null;
      }
      const fromDate = dateTimeUtil.convertFormControlMomentToDate(fromDateControl);
      const toDate = dateTimeUtil.convertFormControlMomentToDate(toDateControl);
      if (toDate !== null && fromDate !== null && isAfter(fromDate, toDate)) {
        return {
          dateLessThan: true,
        };
      }
      return null;
    };
  }

}
