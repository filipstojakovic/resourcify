import {set, startOfDay} from 'date-fns';
import {AbstractControl} from '@angular/forms';
import * as moment from "moment";

function combineDateWithCurrentTime(givenDate: Date) {
  const currentTime = new Date();
  return set(startOfDay(givenDate), {
    hours: currentTime.getHours(),
    minutes: currentTime.getMinutes(),
  });
}

function convertMomentToDate(date: any): Date {
  if (moment.isMoment(date)) {
    return date.toDate();
  }
  return date;
}

function convertFormControlMomentToDate(dateControl: AbstractControl): Date {
  let selectedDate = dateControl.value;
  return convertMomentToDate(selectedDate);
}


const dateTimeUtil = {
  combineDateWithCurrentTime,
  convertMomentToDate,
  convertFormControlMomentToDate,
}

export default dateTimeUtil;
