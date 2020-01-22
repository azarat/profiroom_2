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
  private newMessageSubject = new Subject<any>();

  private chatRoomId: string = null;

  constructor(
    private http: HttpClient
  ) {
    this.socket = io(this.host);
  }

  public connect() {

    this.http.get('/checkAuthirization')
      .subscribe((res: any) => {
        console.log('check-autorization', res);
        if (!res.auth) {
          this.socket.disconnect(this.host);
        } else {
          // get key to access socket
          this.socketId = res.socketId;
          //  connect to user to his own socket
          this.socket.emit('join', this.keyPath + this.socketId);
        }
        // this.socketId = res.socketId;
      });

    // this.socket.on('connect', () => {



    // this.http.get('/checkAuthirization')
    //   .subscribe((res: any) => {
    //     console.log('check', res);
    //     if (!res.auth) {
    //       io.disconnect(this.host);
    //       return;
    //     } else {
    //       console.log(res)
    //       this.socketId = res.socketId;
    //       console.log('[INFO] Connected to ws21', this.socketId);
    //       // return this.socketId;
    //       // this.checkNotifications()
    //       //   .subscribe(res => console.log('notif', res))
    //     }
    //     // this.showNewMessage();
    //   });

    // console.log('[INFO] Connected to ws', this.socketId);
    // });

    this.socket.on('disconnect', () => {
      console.log('[INFO] Disconnected from ws');
    });
  }

  public on(event) {
    // let room = 'laravel_database_presence-' + event + ':message';
    // return new Observable(observer => {

    //   this.socket.on(event, (data) => {
    //     observer.next(data);
    //   });

    //   return () => {
    //     this.socket.disconnect();
    //   };
    // });

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
      console.log(this.chatRoomId, _roomId);
      this.socket.emit('join', this.keyPath + this.chatRoomId);


    }




    // const room = ('gigroom_database_presence-' + this.socketId + ':room').toString();
    // const room1 = 'gigroom_database_presence-' + this.socketId + ':message_' + 'kotik';
    // console.log('try-connection');

    // this.socket.on('connect', () => {
    // this.socket.emit('room', this.keyPath + this.socketId);
    // });

    // this.socket.on('message', (data)=>{
    //   console.log('Incoming message:', data);
    // });
    // const room = ('gigroom_database_presence-' + this.socketId + ':kotik').toString();

    // this.socket.on(room, (data) => {
    // console.log('soket-data', this.socketId);
    // // })

    // const room = this.keyPath + this.socketId + ':message_' + _roomId;
    // return new Observable(observer => {
    //   this.socket.on(room, (data) => {
    //     observer.next(data);
    //   });
    // });
    // return;
  }

  private _resetChatRoom(newRoom) {
      this.socket.emit('leave', this.keyPath + this.chatRoomId)
      return newRoom;
  }

  public checkNotifications() {
    // let x = 'gigroom_database_presence-bJeQJsEAtcahaK8DDtm6:notify';
    // const room = ('gigroom_database_presence-' + this.socketId + ':notify').toString();
    // return new Observable(observer => {
    //   this.socket.on(room, (data) => {
    //     observer.next(data);

    //   });
    // })


  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }


  public showNewMessage() {
    // const room = ('gigroom_database_presence-' + this.socketId + ':rooms').toString();
    // console.log('rommmmm', room)
    // this.socket.on(room, (data) => {

    //   this.newMessageSubject.next(data);
    // });

    // this.socket.on('collocutorsList', (data) => {
    //   console.log(data);
    //   this.newMessageSubject.next(data);

    // });
    return new Observable(observer => {
      this.socket.on('collocutorsList', (data) => {
        observer.next(data);
      });
    });
  }


  // subscribeOnMessages() {

  // }
}
