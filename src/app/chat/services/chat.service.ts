import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ChatService {
  currentRoom;
  constructor(
    private socket: Socket,
    private http: HttpClient
  ) { }

  sentMessage(msg: string) {
    return this.http.post('/message', {roomId: this.currentRoom , autor: 2, message: msg})
    // this.socket.emit('message');
  }

  // getMessage() {
  //   return this.socket
  //   .fromEvent('laravel_database_presence-chat:message')
  //   .pipe(
  //     map((data: any) => {
  //       return data;
  //     })
  //   );
  // }
  getPreviousMessages() {
    return this.http.get('/chat');
  }

  public getChatRooms() {
    return this.http.get('/getChatRooms');
  }

  public openChat(room) {

    let x = 'laravel_database_presence-' + room + ':message';
    console.log('room', x)
    this.currentRoom = room;
    // this.socket.on(x, function(data) {
    //   console.log(data);
    //   // appendMessage(data);

    return this.socket
      .fromEvent(x)
      .pipe(
        map((data: any) => {
          // console.log(data)
          return data;
        })
      )
  }
  // });
}
// }

