import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class SocketService {
  // var socket = require('socket.io-client')('http://localhost');
  socket: any;
  private host = 'http://194.28.103.239:6001';
  // private socket: any = io.connect(this.host);
  public socketId: string = null;
  private keyPath = 'gigroom_database_private-';
  private notificationSubject = new Subject<any>();

  private chatRoomId: string = null;
  private typeOfChat: string = null;

  constructor(
    private http: HttpClient
  ) {
    this.socket = io(this.host);
  }

  public connect() {

    this.http.get('/checkAuthirization')
      .subscribe((res: any) => {
        if (!res.auth) {
          this.socket.disconnect(this.host);
        } else {
          // get key to access socket
          this.socketId = res.socketId;
          //  connect to user to his own socket
          this.socket.emit('join', this.keyPath + this.socketId);
        }
      });

    this.socket.on('disconnect', () => {
      console.log('[INFO] Disconnected from ws');
    });
  }

  public onMessage() {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  // tslint:disable-next-line: variable-name
  public openChat(_roomId: string) {
    if (_roomId === this.chatRoomId) {
      return;
    } else {
      this.chatRoomId = this._resetChatRoom(_roomId);
      this.socket.emit('join', this.keyPath + this.chatRoomId);
    }
  }

  // open new chat
  private _resetChatRoom(newRoom) {
    this.socket.emit('leave', this.keyPath + this.chatRoomId);
    return newRoom;
  }

  public checkNotifications() {
    return new Observable(observer => {
      this.socket.on('notify', (data) => {
        observer.next(data);
      });
    });
  }

  //  user List subscrubing
  public subscribeOnListOfCollucutors(_chatType: string) {
    if (_chatType === this.typeOfChat) {
      return;
    } else {
      this.typeOfChat = this._resetChatRoom(_chatType);
      this.socket.emit('join', this.keyPath + this.typeOfChat + this.socketId);
    }
  }

  public closeCollocutorSocket(_chatType: string) {
    this.socket.emit('leave', this.keyPath + this.chatRoomId + this.socketId);
    return _chatType;
  }



  public showNewMessage() {
    return new Observable(observer => {
      this.socket.on('collocutorsList', (data) => {
        observer.next(data);
      });
    });
  }





  // 'typing'
  onTypingEvent(event: string, userId) {
    this.socket.emit(event, this.keyPath + this.chatRoomId, userId);
  }

  onTypingListener() {
    return new Observable(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
    });
  }

  onStopTypingListener() {
    return new Observable(observer => {
      this.socket.on('stopTyping', (data) => {
        observer.next(data);
      });
    });
  }



}
