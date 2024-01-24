
export type NotificationMessage = {
  forUsername: string;
  message: string;
  status: string;
}

export function isValidNotificationMessage(obj: any): obj is NotificationMessage {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.forUsername === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.status === 'string'
  );
}
module.exports = {
  isValidNotificationMessage
};
