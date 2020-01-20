import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
<<<<<<< HEAD
import { Observable } from 'rxjs';
=======
import { Observable, Subject } from 'rxjs';
>>>>>>> parent of ce0b5e5... socet works
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class SocetService {
  // var socket = require('socket.io-client')('http://localhost');
  socket: any;
  private host = 'http://192.168.0.200:6001';
  // private socket: any = io.connect(this.host);
<<<<<<< HEAD


=======
  private socketId: string;

  private notificationSubject = new Subject<any>();
  private newMessageSubject = new Subject<any>();
>>>>>>> parent of ce0b5e5... socet works
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
<<<<<<< HEAD
          }
=======
          } else {
            this.socketId = res.socketId;
            this.checkNotifications()
              .subscribe(res => console.log('notif', res))
          }
          this.showNewMessage();
>>>>>>> parent of ce0b5e5... socet works
        });

      // console.log('[INFO] Connected to ws');
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

    const room = 'laravel_database_presence-' + roomId + ':message';
    console.log(room);
    return new Observable(observer => {
      this.socket.on(room, (data) => {
        observer.next(data);
      });
    });
<<<<<<< HEAD
  }

=======
    return;
  }

  public checkNotifications() {
    const room = ('gigroom_database_presence-' + this.socketId + ':notify').toString();
    // return new Observable(observer => {
    this.socket.on(room, (data) => {
      this.notificationSubject.next(data);

    });
    // })
    return this.notificationSubject.asObservable();
  }

  public showNewMessage() {
    const room = ('gigroom_database_presence-' + this.socketId + ':rooms').toString();
    this.socket.on(room, (data) => {

      this.newMessageSubject.next(data);
    });
  }
  subscribeOnMessages() {

    return this.newMessageSubject.asObservable();
  }
>>>>>>> parent of ce0b5e5... socet works
}

