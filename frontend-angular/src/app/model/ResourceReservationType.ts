import {UserType} from './UserType';

export type ResourceReservationType = {
  reservationId: string;
  user: UserType;
  reservationDate: Date;
  isApproved: boolean;
}
