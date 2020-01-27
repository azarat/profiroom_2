import { Component, OnInit, AfterViewChecked, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { MessageScrollerService } from '../../services/message-scroller/message-scroller.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  // providers:  [ MessageScrollerService ]
})
export class MessageListComponent implements OnInit, AfterViewChecked {

  @Input() chatRoom: string;
  @Input() messagesList: [];
  @Input() collocutorData: CollocutorListModel;
  userId: any;
  userAvatar: any;
  messCheck = null;
  isScrollDownBtn: boolean = null;
  isShowMoreMessagesBtn: boolean = null;

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
    this.messageScrollerService.onMessageScrollBottom();
  }

  ngAfterViewChecked() {
    this.messageScrollerService.scrollToBottom(this.messagesWrap);
  }

  public onScroll(event) {

    const x = event.target.scrollHeight - event.target.scrollTop;
    this.messageScrollerService.onScroll(this.messagesWrap);
    if (x > event.target.clientHeight + 300) {
      this.isScrollDownBtn = true;
    } else {
      this.isScrollDownBtn = null;
    }

    if (event.target.scrollTop === 0 ) {
      this.isShowMoreMessagesBtn = true;
    } else {
      this.isShowMoreMessagesBtn = null;
    }

  }

  scrollToStart() {
    $('#messages-wrap').animate({
      scrollTop: $('#messages-wrap').get(0).scrollHeight
    }, 1000);
  }

  showMoreMessages() {
    const firstMessage = $('.message:first');
    // this.messagesWrap.nativeElement.scrollTop;
    const cerOffset = firstMessage.offset().top - $('#messages-wrap').scrollTop() - 1;
    this.chatService.getPreviousMessages(this.collocutorData.roomId, this.messagesList.length)
      .subscribe(res => {
        // let x = this.filterArrayOnMessTypes(res[0]);
        this.messagesList = this.filterArrayOnMessTypes(res[0]).concat(this.messagesList);
        $('#messages-wrap').scrollTop(firstMessage.offset().top - cerOffset );
      });
    }


  filterArrayOnMessTypes(arr: any) {
    console.log('event')
    arr.forEach((el: any) => {
      if (el.type === 'file' && typeof el.message === 'string') {
        el.message =   el.message !== '' ? JSON.parse(el.message) : {};
        // newMessage.message =  newMessage.message !== '' ? JSON.parse(newMessage.message) : {};
        return el;
      }
    });
    console.log(arr);
    return arr;

  }
}
