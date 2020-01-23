import { Component, OnInit, AfterViewChecked, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { MessageScrollerService } from '../../services/message-scroller/message-scroller.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  // providers:  [ MessageScrollerService ]
})
export class MessageListComponent implements OnInit, AfterViewChecked {

  @Input() chatRoom: string;
  @Input() messagesList: any[];
  @Input() collocutorData: CollocutorListModel;
  userId: any;
  userAvatar: any;
  messCheck = null;
  messagesLists: any[] = null;
  constructor(
    private chatService: ChatService,
    private messageScrollerService: MessageScrollerService,
    private localStorageService: LocalStorageService
  ) {
    this.userId = (this.localStorageService.getItem('userId').value).toString();
    this.userAvatar = this.localStorageService.getItem('userImage').value;

   }

  @ViewChild('messagesWrap', {static: false}) messagesWrap: ElementRef;
  @ViewChildren('messagesWrap') messages: QueryList<ElementRef>;

  ngOnInit() {
    console.log(this.messagesList);
    this.messagesLists = this.filterArrayOnMessTypes(this.messagesList);
    this.messageScrollerService.onMessageScrollBottom();
  }

  ngAfterViewChecked() {
    this.messageScrollerService.scrollToBottom(this.messagesWrap);
  }

  public onScroll() {
    this.messageScrollerService.onScroll(this.messagesWrap);
  }

  filterArrayOnMessTypes(arr: any) {
    arr.forEach((el: any) => {
      if( el.type === 'file') {
        el.message = JSON.parse(el.message)
        console.log(el.message);
      }
    });
    console.log(arr);
    return arr;

  }
}

