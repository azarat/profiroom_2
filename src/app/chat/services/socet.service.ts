import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class SocetService {
  // var socket = require('socket.io-client')('http://localhost');
  socket: any;
  private host = 'http://192.168.0.200:6001';
  // private socket: any = io.connect(this.host);


  constructor(
    private http: HttpClient
  ) {
    this.socket = io(this.host);
  }

  public connect() {
    this.socket.on('connect', () => {
      this.http.get('/checkAuthirization')
        .subscribe((res: any) => {
          if (!res.auth) {
            io.disconnect(this.host);
            return;
          }
        });

      // console.log('[INFO] Connected to ws');
    });

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

    // return () => {
    //   this.socket.disconnect();
    // };
  };

  public openChat(roomId) {
    this.socket.disconnect();
    this.socket.connect();
    const room = 'laravel_database_presence-' + roomId + ':message';
    console.log(room)
    return new Observable(observer => {
      this.socket.on(room, (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  }

}

