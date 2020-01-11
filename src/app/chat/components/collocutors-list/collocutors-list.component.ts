import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocetService } from '../../services/socet.service';
import { plainToClass } from 'class-transformer';

//  Chat time converter

import { formatDataFunction } from 'src/app/shared/functions/format-data.function';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';

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
        console.log(this.collocutors);

      });
  }

  public openChat(userinfo) {
    this.currentRoom.emit(userinfo);
  }

}
