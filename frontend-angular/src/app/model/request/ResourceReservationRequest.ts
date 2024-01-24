import {addDays} from 'date-fns';

export type ResourceReservationRequest = {
  forUserId: string,
  resourceId: string,
  fromDate: Date,
  toDate: Date,
  description: string
}

export function initResourceReservationReq() {
  return {
    forUserId: "",
    resourceId: "",
    fromDate: new Date(),
    toDate: addDays(new Date(), 1),
    description: "",
  } as ResourceReservationRequest;
}
