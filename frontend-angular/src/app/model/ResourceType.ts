import {ResourceReservationType} from './ResourceReservationType';
import {constants} from "../constants/constants";

export type ResourceType = {
  id?: string;
  name: string;
  description?: string;
  amount: number;
  backgroundColor?: string;
  reservations?: ResourceReservationType[];
}

export function initResource(): ResourceType {
  return {
    id: null,
    name: "",
    description: "",
    amount: 1,
    backgroundColor: constants.DEFAULT_EVENT_COLOR,
    reservations: [],
  } as ResourceType;
}
