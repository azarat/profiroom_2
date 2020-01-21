import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { plainToClass } from 'class-transformer';

//  Chat time converter

import { formatDataFunction } from 'src/app/shared/functions/format-data.function';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

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
  userIdString
  public userId;
  // DateFormatPipe
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
    this.userIdString = this.userId.toString();
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
    console.log(arr)
    if (arr.length !== 0) {
      const foundIndex = arr.findIndex(x => x.roomId === obj.roomId);
      console.log('COLLLLOCUTOOOOORS', this.collocutors[foundIndex]);
      this.collocutors[foundIndex].message[0] = obj.message[0];
    } else {
      this.collocutors.push(obj);
    }
    // if (this.collocutors.length !== 0) {


    //   return;
    // }
    // else if (this.collocutors.length === 0) {
    //   this.collocutors.push(obj);
    //   console.log('2', this.collocutors);
    //   return;
    // }
    // else {
    //   console.log(this.collocutors.length);
    //   this.collocutors.push(obj.message);
    //   console.log('1', this.collocutors);
    //   return;
    // }


    // if (this.collocutors.length === 0) {
    //   console.log(this.collocutors.length);
    //   this.collocutors.push(obj.message);
    //   console.log('1', this.collocutors);
    //   return;
    // } else if (this.collocutors[0].message.length === 0) {
    //    this.collocutors[0].message[0] = obj.message;
    //    console.log('2', this.collocutors);
    //    return;
    // } else if(this.collocutors[0].message.length === 0){
    //   const foundIndex = arr.findIndex(x => x.roomId === obj.roomId);
    //   this.collocutors[foundIndex].message[0] = obj.message;
    // }
    // console.log( this.collocutors);
    // this.collocutors = arr.reduce((acc, value) => {
    //   acc.push(value.roomId === obj.roomId ? obj.lastMessage[0] : value);
    //   return acc;
    // }, []);
  }

  sortMessagesByTime(arr) {
    const x = arr.sort((a, b) => {
      return b.message[0].dateTime.localeCompare(a.message[0].dateTime);
    });
    this.collocutors = x;
  }

}
