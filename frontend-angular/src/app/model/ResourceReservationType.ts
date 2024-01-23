import {UserType} from './UserType';

export type ResourceReservationType = {
  reservationId: string;
  resourceName: string;
  user: UserType;
  description: string;
  reservationDate: Date;
  approved: boolean;
}
