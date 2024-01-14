import {UserType} from './UserType';

export type ResourceReservationType = {
  resourceId: string;
  reservationId: string;
  user: UserType;
  reservationDate: Date;
  isApproved: boolean;
}
