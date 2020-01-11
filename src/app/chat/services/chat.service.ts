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
    console.log(userId)
    return this.http.post('/message', { roomId: room, author: userId, message: msg });
  }

  getPreviousMessages(roomId: string) {
    return this.http.get('/chat?roomId=' + roomId);
  }

  public getChatRooms() {
    return this.http.get('/getChatRooms');
  }


}


