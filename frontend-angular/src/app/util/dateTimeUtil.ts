import {set, startOfDay} from 'date-fns';

function combineDateWithCurrentTime(givenDate: Date) {
  const currentTime = new Date();
  return set(startOfDay(givenDate), {
    hours: currentTime.getHours(),
    minutes: currentTime.getMinutes(),
  });
}

const dateTimeUtil = {
  combineDateWithCurrentTime,
}

export default dateTimeUtil;
