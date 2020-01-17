import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ColaborationsListService {

  socket: any;
  private host = 'http://192.168.0.200:6001';
  private newMessageSubject = new BehaviorSubject(null);

  constructor() {
    this.socket = io(this.host);
  }

  public showNewMessage(socetId) {
    const room = ('gigroom_database_presence-' + socetId + ':rooms').toString();
    this.socket.on(room, (data) => {

      this.newMessageSubject.next(data);
    });
  }

  subscribeOnMessages() {
    return this.newMessageSubject.asObservable();
  }

}
