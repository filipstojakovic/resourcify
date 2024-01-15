import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  ws: WebSocket;

  constructor(private auth: AuthService) {
  }

  connect(): Observable<string> {
    const token = this.auth.getToken();
    let url = `${environment.SOCKET_URL}/ws?token=${token}`;
    this.ws = new WebSocket(url);
    return new Observable(observer => {
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onerror = (event) => {
        console.log("socket.service.ts > onerror()");
        observer.error(event);
      }
      this.ws.onclose = (event) => {
        console.log("socket.service.ts > onclose()");
        observer.complete();
      }
      return () => {
        console.log('WebSocket connection closed');
        this.reconnect();
      }
    })
  }

  private reconnect(): void {
    console.log("socket.service.ts > reconnect()" + "");
    setTimeout(() => {
      this.connect();
    }, 2000);
  }
}
