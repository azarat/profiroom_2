import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  collocutorData;
  @Input() chatType: string;

  constructor() { }

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
    }, 10);

  }

  // getCollocutorImg(img: string) {
  //   this.collocutorImg = img;
  // }

}
