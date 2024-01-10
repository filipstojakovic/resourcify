import {ResourceReservationType} from './ResourceReservationType';

export type ResourceType = {
  id: string;
  name: string;
  description?: string;
  amount: number;
  backgroundColor?: string;
  reservations: ResourceReservationType[];
}

export function initResource(): ResourceType {
  return {
    id: "",
    name: "",
    amount: 1,
    backgroundColor: "",
    reservations: [],
  } as ResourceType;
}
