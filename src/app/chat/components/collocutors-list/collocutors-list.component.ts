import { Component, OnInit, Input, EventEmitter, Output,  } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocetService } from '../../services/socet.service';

@Component({
  selector: 'app-collocutors-list',
  templateUrl: './collocutors-list.component.html',
  styleUrls: ['./collocutors-list.component.scss']
})
export class CollocutorsListComponent implements OnInit {

  chatRooms: any ;
  @Input()chatType: string;
  @Output() currentRoom = new EventEmitter();

  constructor(
    private chatService: ChatService,
    private socketService: SocetService
  ) { }

  ngOnInit() {
    this.chatService.getChatRooms()
      .subscribe(res => {
        this.chatRooms = res;
        console.log(res);
      });
  }

  openChat(room) {
    const x = 'laravel_database_presence-' + room + ':message';
    this.currentRoom.emit(x);
    this.socketService.on(x)
    .subscribe(res => {
      console.log(res)

    })
    // this.chatService.openChat(room);
  }

  catchEror(){
    // this.chatService.erorrCatch()
  }

}
