import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {addHours, isAfter} from "date-fns";

export class DateValidators {

  static isThisMuchHoursInFuture(hours: number): ValidatorFn {
    return (selectedDateControl: AbstractControl): ValidationErrors | null => {

      let selectedDate = selectedDateControl.value;
      if (selectedDate['_isAMomentObject'] != null && selectedDate['_isAMomentObject']) {
        selectedDate = selectedDate.toDate();
      }
      const futureDate: Date = addHours(new Date(), hours);

      if (!isAfter(selectedDate, futureDate)) {
        return {dateNotValid: true};
      }
      return null;
    };
  }
}
