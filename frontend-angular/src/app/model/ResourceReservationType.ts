import {UserType} from './UserType';

export type ResourceReservationType = {
  user: UserType;
  reservationDate: Date;
  active: boolean;
}
