export type NotificationMessage = {
  forUsername: string;
  message: string;
  status: Status;
}

export enum StatusEnum {
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  PENDING = "PENDING",
}

export type Status = StatusEnum.APPROVED | StatusEnum.DECLINED | StatusEnum.PENDING;
