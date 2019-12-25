import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-collocutors-list',
  templateUrl: './collocutors-list.component.html',
  styleUrls: ['./collocutors-list.component.scss']
})
export class CollocutorsListComponent implements OnInit {

  chatRooms: any;
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.getChatRooms()
    .subscribe(res => {
      this.chatRooms = res;
      console.log(res)
    })
  }

  openChat(room) {

    this.chatService.openChat(room).subscribe((res)=>{
      console.log(res)
    })
  }

}
