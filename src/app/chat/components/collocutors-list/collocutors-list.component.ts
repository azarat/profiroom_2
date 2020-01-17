import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocetService } from '../../services/socet.service';
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


  public collocutors: CollocutorListModel;
  public lastMessageDate: string;
  @Input() chatType: string;
  @Output() currentRoom = new EventEmitter();
  public userId;
  // DateFormatPipe
  constructor(
    private chatService: ChatService,
    private socketService: SocetService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.chatService.getChatRooms()
      .subscribe(res => {
        console.log(res);
        this.collocutors = plainToClass(CollocutorListModel, res);
        this.sortMessagesByTime(this.collocutors);
      });

    this.socketService.showNewMessage();
    this.userId = this.localStorageService.getItem('userId').value;

    this.socketService.subscribeOnMessages()
    .subscribe(res => {
      console.log('new mess', res);
      this.pushNewMessage(this.collocutors, res);
      this.sortMessagesByTime(this.collocutors);
    });
  }

  ngAfterViewInit(): void {

  }

  public openChat(userinfo) {
    this.currentRoom.emit(userinfo);
  }

  pushNewMessage(arr, obj: any) {

    const foundIndex = arr.findIndex(x => x.roomId === obj.roomId);
    this.collocutors[foundIndex].lastMessage[0] = obj.message;
  }

  sortMessagesByTime(arr) {
    const x = arr.sort((a, b) => {
      return b.lastMessage[0].dateTime.localeCompare(a.lastMessage[0].dateTime);
    });
    this.collocutors = x;
  }

}
