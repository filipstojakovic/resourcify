import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  static readonly SOCKET_CONNECTED: number = 1;
  ws: WebSocket;

  constructor(private auth: AuthService) {
  }

  connect(): Observable<string> {
    const token = this.auth.getToken();
    let url = `${environment.SOCKET_URL}/ws?token=${token}`;
    this.ws = new WebSocket(url);
    return new Observable(observer => {
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => observer.complete();
      return () => this.ws.close(1000, "User disconnected");
    })
  }

  //just for testing
  sendMessage(message: any) {
    if (this.ws.readyState === SocketService.SOCKET_CONNECTED) {
      const stringMessage = JSON.stringify(message);
      this.ws.send(stringMessage);
    } else {
      console.log("socket.service.ts > sendMessage(): " + "socket not connected");
    }
  }

}
