import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, filter } from 'rxjs/operators';

@Injectable()

export class ChatService {

  constructor(
    private socket: Socket
  ) { }

  sentMessage(msg: string) {
    this.socket.emit('message',  );
  }

  getMessage(){
    return this.socket
    .fromEvent('laravel_database_presence-chat:message')
    .pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
