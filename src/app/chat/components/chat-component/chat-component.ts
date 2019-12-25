import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit {

  @Input() chatType: string;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    // console.log(this.chatType)
    // this.chatService.getMessage()
    // .subscribe(res => {
    //   console.log(res);
    // });
  }

}
