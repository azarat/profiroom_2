import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { plainToClass } from 'class-transformer';

//  Chat time converter

import { formatDataFunction } from 'src/app/shared/functions/format-data.function';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import {Howl, Howler} from 'howler';




const sound = new Howl({
  src: ['/assets/sounds/notification.mp3']
});

@Component({
  selector: 'app-collocutors-list',
  templateUrl: './collocutors-list.component.html',
  styleUrls: ['./collocutors-list.component.scss']
})
export class CollocutorsListComponent implements OnInit, AfterViewInit {


  public collocutors;
  public lastMessageDate: string;
  @Input() chatType: string;
  @Output() currentRoom = new EventEmitter();

  public userId;
  // DateFormatPipe

  // sound = new Howl({
  //   src: ['/assets/sounds/notification.mp3']
  // });
  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.chatService.getChatRooms()
      .subscribe(res => {

        this.collocutors = res;
        console.log(this.collocutors);
        this.sortMessagesByTime(this.collocutors);
      });

    // this.socketService.subscribeOnMessages()
    //   .subscribe(res => {
    //     console.log('new mess', res);
    //     this.pushNewMessage(this.collocutors, res);
    //     // this.sortMessagesByTime(this.collocutors);
    //   });

    this.socketService.showNewMessage()
      .subscribe(res => {
        console.log('new mess', res);
        this.pushNewMessage(this.collocutors, res);
        // this.sortMessagesByTime(this.collocutors);
      })
    this.userId = this.localStorageService.getItem('userId').value;

      console.log(this.userId)
    // this.socketService.subscribeOnMessages()
    // .subscribe(res => {
    //   console.log('new mess', res);
    //   this.pushNewMessage(this.collocutors, res);
    //   // this.sortMessagesByTime(this.collocutors);
    // });
  }

  ngAfterViewInit(): void {

  }



  public openChat(userinfo) {
    this.currentRoom.emit(userinfo);
    this.socketService.openChat(userinfo.roomId);
  }

  pushNewMessage(arr, obj: any) {

    sound.play();


    console.log(arr)
    if (arr.length !== 0) {
      const foundIndex = arr.findIndex(x => x.roomId === obj.roomId);
      console.log('COLLLLOCUTOOOOORS', this.collocutors[foundIndex]);
      this.collocutors[foundIndex] = obj;
    } else {
      this.collocutors.push(obj);
    }

  }

  sortMessagesByTime(arr) {
    const x = arr.sort((a, b) => {
      return b.message[0].dateTime.localeCompare(a.message[0].dateTime);
    });
    this.collocutors = x;
  }

}
