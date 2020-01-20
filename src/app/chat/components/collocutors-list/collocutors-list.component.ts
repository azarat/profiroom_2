import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocetService } from '../../services/socet.service';
import { plainToClass } from 'class-transformer';

//  Chat time converter

import { formatDataFunction } from 'src/app/shared/functions/format-data.function';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
<<<<<<< HEAD
=======
import { filter } from 'rxjs/operators';
>>>>>>> parent of ce0b5e5... socet works

@Component({
  selector: 'app-collocutors-list',
  templateUrl: './collocutors-list.component.html',
  styleUrls: ['./collocutors-list.component.scss']
})
export class CollocutorsListComponent implements OnInit {

  public collocutors: CollocutorListModel;
  public lastMessageDate: string;
  @Input() chatType: string;
  @Output() currentRoom = new EventEmitter();

  // DateFormatPipe
  constructor(
    private chatService: ChatService,
    private socketService: SocetService
  ) { }

  ngOnInit() {
    this.chatService.getChatRooms()
      .subscribe(res => {
        console.log(res);
        this.collocutors = plainToClass(CollocutorListModel, res);
<<<<<<< HEAD
        console.log(this.collocutors);
=======
        this.sortMessagesByTime(this.collocutors);
      });

    this.socketService.subscribeOnMessages()
      .subscribe(res => {
        console.log('new mess', res);
        this.pushNewMessage(this.collocutors, res);
        this.sortMessagesByTime(this.collocutors);
      });
  }

  ngAfterViewInit(): void {
>>>>>>> parent of ce0b5e5... socet works

      });
  }

  public openChat(userinfo) {
    this.currentRoom.emit(userinfo);
  }

<<<<<<< HEAD
=======
  pushNewMessage(arr, obj: any) {

    const foundIndex = arr.findIndex(x => x.roomId === obj.roomId);
    this.collocutors[foundIndex].lastMessage[0] = obj.message;
    // this.collocutors = arr.reduce((acc, value) => {
    //   acc.push(value.roomId === obj.roomId ? obj.lastMessage[0] : value);
    //   return acc;
    // }, []);
  }

  sortMessagesByTime(arr) {
    const x = arr.sort((a, b) => {
      return b.lastMessage[0].dateTime.localeCompare(a.lastMessage[0].dateTime);
    });
    this.collocutors = x;
  }

>>>>>>> parent of ce0b5e5... socet works
}
