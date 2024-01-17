export type ResourceReservationRequest = {
  forUserId: string,
  resourceId: string,
  reservationDate: Date,
  description: string
}

export function initResourceReservationReq() {
  return {
    forUserId: "",
    resourceId: "",
    reservationDate: new Date(),
    description: "",
  } as ResourceReservationRequest;
}
