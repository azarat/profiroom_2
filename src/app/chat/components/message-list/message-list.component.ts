import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  messages: any[] = messages;



  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
  //   this.chatService.getPreviousMessages()
  //   .subscribe(res => {
  //     console.log(res);
  //   });
  }

}
