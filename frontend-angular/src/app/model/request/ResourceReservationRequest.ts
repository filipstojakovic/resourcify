import {addHours} from "date-fns";
import {Constants} from "../../constants/constants";

export type ResourceReservationRequest = {
  userId: string,
  resourceId: string,
  date: Date,
  description: string
}

export function initResourceReservationReq() {
  return {
    userId: "",
    resourceId: "",
    date: addHours(new Date(), Constants.RESERVATION_TIME_DIFFERENCE + 1),
    description: "",
  } as ResourceReservationRequest;
}
