import {ResourceReservationType} from './ResourceReservationType';

export type ResourceType = {
  id: string;
  name: string;
  description?: string;
  amount: number;
  backgroundColor: string;
  reservations: ResourceReservationType[];
}
