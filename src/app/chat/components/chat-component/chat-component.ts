import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  collocutorData;
  @Input() chatType: string;
  public isFileLoaderVisible: boolean = null;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    // console.log(this.chatType)
    // this.chatService.getMessage()
    // .subscribe(res => {
    //   console.log(res);
    // });

  }
  ngOnDestroy(): void {
    // console.log('destroyed')
    // this.chatService.removeListener();

  }

  getCurrentRoom(userInfo) {
    console.log(userInfo);
    this.collocutorData = false;
    setTimeout(() => {
      // this.chatRoom = userInfo.roomId;
      this.collocutorData = userInfo;
    }, 100);

  }

  // getCollocutorImg(img: string) {
  //   this.collocutorImg = img;
  // }

}
