import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class SocketService {
  // var socket = require('socket.io-client')('http://localhost');
  socket: any;
  private host = 'http://192.168.0.200:6001';
  // private socket: any = io.connect(this.host);
  public socketId: string = null;
  private keyPath = 'gigroom_database_private-';
  private notificationSubject = new Subject<any>();

  private chatRoomId: string = null;

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
    return;
    this.socket.on('message', (data) => {

    })

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

  private _resetChatRoom(newRoom) {
    this.socket.emit('leave', this.keyPath + this.chatRoomId)
    return newRoom;
  }

  public checkNotifications() {
    return new Observable(observer => {
      this.socket.on('notify', (data) => {
        observer.next(data);
      });
    });
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
    this.socket.emit(event , this.keyPath + this.chatRoomId, userId);
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
