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
    date: new Date(),
    description: "",
  } as ResourceReservationRequest;
}
