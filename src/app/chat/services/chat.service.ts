import { Injectable } from '@angular/core';
// import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

// const config: SocketIoConfig = { url: 'http://192.168.0.200:6001', options: {} }

@Injectable()

export class ChatService {
  currentRoom: string;

  private connection: string;

  messagesArray: any[];
  constructor(
    // private socket: Socket,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  sentMessage(msg: string, room) {
    const userId = this.localStorageService.getItem('userId').value;

    return this.http.post('/message', { roomId: room, autor: userId, message: msg });
    // this.socket.emit('message');
  }

  getPreviousMessages(roomId: string) {
    return this.http.get('/chat?roomId=' + roomId);
  }

  public getChatRooms() {
    return this.http.get('/getChatRooms');
  }

  // public openChat(room) {
    // const jwtToken = this.localStorageService.getItem('token').value;
    // const x = 'laravel_database_presence-' + room + ':message';
    // console.log('room', x);
    // this.currentRoom = room;
    // // this.socket.on(x, function(data) {
    // console.log(this.currentRoom);
    // //   // appendMessage(data);
    // this.connection = x;

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
  // }

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

