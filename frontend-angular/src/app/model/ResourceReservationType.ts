import {UserType} from './UserType';
import {Status} from './NotificationMessage';

export type ResourceReservationType = {
  reservationId: string;
  resourceName: string;
  user: UserType;
  description: string;
  fromDate: Date;
  toDate: Date;
  status: Status;
}
