import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class SocketService {
  // var socket = require('socket.io-client')('http://localhost');
  socket: any;
  private host: string;
  // private host = '/';
  // private socket: any = io.connect(this.host);
  public socketId: string = null;
  private keyPath = 'gigroom_database_private-';
  private notificationSubject = new Subject<any>();

  private chatRoomId: string = null;
  private typeOfChat: string = null;

  constructor(
    private http: HttpClient
  ) {
    if (location.origin !== 'https://profiroom.com') {
      this.host = 'http://194.28.103.239:6001';
    } else {
      this.host = '/';
    }
    this.socket = io.connect(this.host , {secure: true});

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
          this.socket.emit('join', this.keyPath + this.socketId);
          this.socket.emit('join', 'gigroom_database_private-bellRoom-' + this.socketId);
        }
      });

    this.socket.on('disconnect', () => {
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
    console.log(_roomId, this.chatRoomId)

    if (!this.chatRoomId) {
      console.log('room null', _roomId)
      this.chatRoomId = _roomId;
      this.socket.emit('join', this.keyPath + _roomId);
      console.log('room null')
      return;
    } else if (_roomId === this.chatRoomId) {
      console.log('room same')
      return;
    } else if(_roomId !== this.chatRoomId) {
      console.log('room different')
      this.chatRoomId = this.resetChatRoom(_roomId);
      this.socket.emit('join', this.keyPath + this.chatRoomId);
    }
  }

  // open new chat
  public resetChatRoom(newRoom) {
  this.socket.emit('leave', this.keyPath + this.chatRoomId);
  return newRoom;
}

  public checkNotifications() {
  return new Observable(observer => {
    this.socket.on('notify', (data) => {
      console.log(data);
      observer.next(data);
    });
  });
}

  //  user List subscribing
  // tslint:disable-next-line:variable-name
  public subscribeOnCollocutorList(_chatType: string) {
  // if (_chatType === this.typeOfChat) {
  // this.typeOfChat = _chatType !== this.typeOfChat ? this._resetChatRoom(_chatType) : this.typeOfChat;

  this.socket.emit('join', this.keyPath + this.typeOfChat + this.socketId);
  // }
}

  // tslint:disable-next-line:variable-name
  public closeCollocutorSocket(_chatType: string) {
  this.socket.emit('leave', this.keyPath + this.chatRoomId + this.socketId);
  return _chatType ? _chatType : this.typeOfChat;
}



  public showNewMessage() {
  return new Observable(observer => {
    this.socket.on('collocutorsList', (data) => {
      observer.next(data);
    });
  });
}

  public subscribeDeal() {
  this.socket.emit('join', this.keyPath + 'systemMessage_' + this.socketId);
}

  public dealUpdating() {
  return new Observable(observer => {
    this.socket.on('DealInfo', (data) => {
      observer.next(data);
      console.log('dealData', data);
    });
  });
}

  // 'typing'
  public onTypingEvent(event: string, userId) {
  this.socket.emit(event, this.keyPath + this.chatRoomId, userId);
}

  public onTypingListener() {
  return new Observable(observer => {
    this.socket.on('typing', (data) => {
      observer.next(data);
    });
  });
}

  public onStopTypingListener() {
  return new Observable(observer => {
    this.socket.on('stopTyping', (data) => {
      observer.next(data);
    });
  });
}

  // Notifications in dashboard
  public checkSystemNotifications() {
  return new Observable(observer => {
    this.socket.on('bellEvent', (data) => {
      observer.next(data);
    });
  });
}


}
