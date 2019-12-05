import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, filter } from 'rxjs/operators';

@Injectable()

export class ChatService {

  constructor(
    private socket: Socket
  ) { }
  sentMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage(){
    return this.socket
    .fromEvent('message')
    .pipe(
      map((data: any) => data.msg)
    );
  }
}
