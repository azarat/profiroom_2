import { Injectable } from '@angular/core';
// import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

// const config: SocketIoConfig = { url: 'http://192.168.0.200:6001', options: {} }

@Injectable()

export class ChatService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public sendMessage(msg: any, room: string | number, messageType: string, _chatType: string) {
    const userId = this.localStorageService.getItem('userId').value;
    return this.http.post('/message', { roomId: room, author: userId, message: msg, type: messageType, chatType: _chatType });
  }

  public getPreviousMessages(roomId: string | number, messCount: number, chatType: string) {
    return this.http.get('/getRoomMessages?roomId=' + roomId + '&start=' + messCount + '&chatType=' + chatType);
  }
  // work_
  public getChatRooms(chatType: string) {
    return this.http.get('/getChat' + chatType + 'Rooms');
  }
 
  public getCollocutorInformation(id) {
    return this.http.get('/getChatUser?id=' + id);
  }

  // tslint:disable-next-line: variable-name
  public getUploadedFiles(_roomId) {
    return this.http.post('/getChatFiles', { roomId: _roomId });
  }



}


