import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocetService } from '../../services/socet.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public chatRoom: string = null;
  @Input() chatType: string;

  constructor(
    private chatService: ChatService,
    private socetService: SocetService
  ) { }

  ngOnInit() {
    // console.log(this.chatType)
    // this.chatService.getMessage()
    // .subscribe(res => {
    //   console.log(res);
    // });
    this.socetService.connect();
  }
  ngOnDestroy(): void {
    console.log('destroyed')
    this.chatService.removeListener();

  }

  getCurrentRoom(curentRoom: string) {
    this.chatRoom = null;
    this.chatRoom = curentRoom;


  }

}
