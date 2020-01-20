import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class SocetService {
  // var socket = require('socket.io-client')('http://localhost');
  socket: any;
  private host = 'http://192.168.0.200:6001';
  // private socket: any = io.connect(this.host);
  private socketId: string = null;

  private notificationSubject = new Subject<any>();
  private newMessageSubject = new Subject<any>();

  constructor(
    private http: HttpClient
  ) {
    this.socket = io(this.host);
  }

  public connect() {
    this.socket.on('connect', () => {
      this.http.get('/checkAuthirization')
        .subscribe((res: any) => {
          console.log('check', res);
          if (!res.auth) {
            io.disconnect(this.host);
            return;
          } else {
            console.log(res)
            this.socketId = res.socketId;
            console.log('[INFO] Connected to ws21', this.socketId);
            // return this.socketId;
            this.checkNotifications()
            //   .subscribe(res => console.log('notif', res))
          }
          // this.showNewMessage();
        });

      console.log('[INFO] Connected to ws', this.socketId);
    });

    this.socket.on('disconnect', () => {
      console.log('[INFO] Disconnected from ws');
    });
  }

  public on(event) {
    // let room = 'laravel_database_presence-' + event + ':message';
    return new Observable(observer => {

      this.socket.on(event, (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

  }
  public openChat(roomId) {
    const room = 'gigroom_database_presence-' + this.socketId + ':message_' + roomId;
    return new Observable(observer => {
      this.socket.on(room, (data) => {
        observer.next(data);
      });
    });
    return;
  }

  public checkNotifications() {
    let x = 'gigroom_database_presence-bJeQJsEAtcahaK8DDtm6:notify';
    const room = ('gigroom_database_presence-' + this.socketId + ':notify').toString();
    return new Observable(observer => {
      this.socket.on(room, (data) => {
       observer.next(data);

      });
    })


  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }


  public showNewMessage() {
    const room = ('gigroom_database_presence-' + this.socketId + ':rooms').toString();
    console.log('rommmmm', room)
    this.socket.on(room, (data) => {

      this.newMessageSubject.next(data);
    });
  }

  subscribeOnMessages() {
    return this.newMessageSubject.asObservable();
  }
}

