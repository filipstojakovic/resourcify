import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationEmitterService {

  public eventEmitter = new EventEmitter();

  constructor() {
  }
}
