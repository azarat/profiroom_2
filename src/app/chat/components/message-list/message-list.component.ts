import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input() chatRoom;
  messages: any[];
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.getPreviousMessages(this.chatRoom)
      .subscribe((res: any) => {
        console.log(res);
        this.messages = res;
      });
  }

  open() {
    // this.chatService.openChat('kotik');
  }

}
