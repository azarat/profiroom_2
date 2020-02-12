import { Component, OnInit, AfterViewChecked, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { MessageScrollerService } from '../../services/message-scroller/message-scroller.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import * as $ from 'jquery';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  // providers:  [ MessageScrollerService ]
})
export class MessageListComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @Input() chatRoom: string;
  @Input() messagesList: any[];
  @Input() collocutorData: CollocutorListModel;
  userId: any;
  userAvatar: any;
  messCheck = null;
  isScrollDownBtn: boolean = null;
  isShowMoreMessagesBtn: boolean = null;
  public typing: boolean = null;
  public typingUser: number;
  constructor(
    private chatService: ChatService,
    private messageScrollerService: MessageScrollerService,
    private localStorageService: LocalStorageService,
    private socetService: SocketService
  ) {
    this.userId = (this.localStorageService.getItem('userId').value).toString();
    this.userAvatar = this.localStorageService.getItem('userImage').value;

  }

  @ViewChild('messagesWrap') messagesWrap: ElementRef;

  ngOnInit() {
    this.messageScrollerService.onMessageScrollBottom();
    // this.typingEventListener();
    console.log(this.messagesList);
    console.log('dddd');
  }
  ngAfterViewInit(): void {
    // this._checkOnUnreadedMessages();
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

    if (event.target.scrollTop === 0) {
      this.isShowMoreMessagesBtn = true;
    } else {
      this.isShowMoreMessagesBtn = null;
    }
  }

  public scrollToStart() {
    $('#messages-wrap').animate({
      scrollTop: $('#messages-wrap').get(0).scrollHeight
    }, 1000);
  }

  public showMoreMessages() {
    const firstMessage = $('.message:first');
    const cerOffset = firstMessage.offset().top - $('#messages-wrap').scrollTop() - 1;
    this.chatService.getPreviousMessages(this.collocutorData.roomId, this.messagesList.length)
      .subscribe(res => {
        this.messagesList = this.filterArrayOnMessTypes(res[0]).concat(this.messagesList);
        $('#messages-wrap').scrollTop(firstMessage.offset().top - cerOffset);
      });
  }


  private filterArrayOnMessTypes(arr: any) {
    arr.forEach((el: any) => {
      if (el.type === 'file' && typeof el.message === 'string') {
        el.message = el.message !== '' ? JSON.parse(el.message) : {};
        return el;
      }
    });
    return arr;
  }

  // Scroll To first unreaded message -- need to be calculated better
  // private _checkOnUnreadedMessages() {
  //   if (this.collocutorData.unread.toString() === this.userId) {
  //     const firstUnreadedMessageOffset = $('.message-anchor:last-of-type').offset().top;

  //     // console.log(firstUnreadedMessage)
  //     $('#messages-wrap').animate({
  //       scrollTop: - firstUnreadedMessageOffset
  //     }, 100);
  //     this.messageScrollerService.disableAutoScroll();
  //   }
  // }
}
