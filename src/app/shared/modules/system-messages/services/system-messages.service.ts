import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class SystemMessagesService {
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
    this.socket = io.connect(this.host);
  }

  public connect() {
    this.http.get('/checkAuthorization')
      .subscribe((res: any) => {
        if (!res.auth) {
          this.socket.disconnect(this.host);
        } else {
          // get key to access socket
          this.socketId = res.socketId;
          //  connect to user to his own socket
          this.socket.emit('join', 'gigroom_database_private-bellRoom-' + this.socketId);
          console.log( 'gigroom_database_private-bellRoom-' + this.socketId);
        }
      });

    this.socket.on('disconnect', () => {
      console.log('[INFO] Disconnected from ws');
    });
  }

  public checkSystemNotifications() {
    return new Observable(observer => {
      this.socket.on('bellEvent', (data) => {
        observer.next(data);
      });
    });
  }

  public systemMessagesList() {
    return this.http.get('/bellNotice')
  }

  public deleteSystemMessage(messageID) {
    if(messageID !== 0) {
      return this.http.post('/deleteBellNotice', {noticeId: messageID})
    } else {
      return this.http.post('/deleteBellNotice', {all: true})
    }
  }

}
