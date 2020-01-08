import { Injectable } from '@angular/core';
// import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

// const config: SocketIoConfig = { url: 'http://192.168.0.200:6001', options: {} }

@Injectable()

export class ChatService {
  currentRoom;

  private connection: string;

  messagesArray: any[];
  constructor(
    // private socket: Socket,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  sentMessage(msg: string, room) {
    return this.http.post('/message', { roomId: room, autor: 2, message: msg });
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
    const jwtToken = this.localStorageService.getItem('token').value;
    const x = 'laravel_database_presence-' + room + ':message';
    console.log('room', x);
    this.currentRoom = room;
    // this.socket.on(x, function(data) {
    //   console.log(data);
    //   // appendMessage(data);
    this.connection = x;

    // this.socket.on('conection', ()=> {
    //   this.socket.emit('authenticate', {token: jwtToken});
    // })
    // this.socket.on('connection', () => {

    // this.socket.on('authenticate', () => {
    //   console.log('send token');
    // this.socket.emit('authenticate', {token: jwtToken});
    // });
    // });

    // this.socket
    //   .fromEvent(x)
    //   .pipe(
    //     map((data: any) => {
    //       console.log(data)
    //       return data;
    //     })
    //   );
    // this.socket.on('error', (error)=> {
    //   console.log(error);
    //   return error;

    // })
  }

  erorrCatch() {
    // return this.socket.on('error', (data)=> {
    //   console.log('erorr', data);
    //   return data;
    // })
  }

  removeListener() {
    // this.socket.disconnect();
  }
}
// }

