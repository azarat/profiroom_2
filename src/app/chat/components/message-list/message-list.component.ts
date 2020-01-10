import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input() chatRoom: string;
  // @Input() collocutorImg: string;
  @Input() messagesList;

  // public messagesList = null;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {

  }

  open() {
    // this.chatService.openChat('kotik');
  }

}
