import { Component, OnInit, AfterViewChecked, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { MessageScrollService } from '../../services/message-scroll/message-scroll.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import * as $ from 'jquery';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})

export class MessageListComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @Input() chatType: string;
  @Input() messagesList: any[];
  @Input() collocutorData: CollocutorListModel;

  @Output() swipeDirection = new EventEmitter();

  public userId: any;
  public userAvatar: any;
  public messCheck = null;
  public isScrollDownBtn: boolean = null;
  public isShowMoreMessagesBtn: boolean = null;
  public typing: boolean = null;
  public typingUser: number;
  public isMessages = true;

  constructor(
    private chatService: ChatService,
    private messageScrollService: MessageScrollService,
    private localStorageService: LocalStorageService,
    private socketService: SocketService
  ) {
    this.userId = this.localStorageService.getItem('userId').value;
    this.userAvatar = this.localStorageService.getItem('userImage').value;
  }

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  @ViewChild('messagesWrap', { static: false }) messagesWrap: ElementRef;

  ngOnInit() {
    this.messageScrollService.onMessageScrollBottom();
    this.typingEventListener();
  }

  ngAfterViewInit(): void {
    // this._checkOnUnreadedMessages();
  }

  ngAfterViewChecked() {
    this.messageScrollService.scrollToBottom(this.messagesWrap);

  }


  public onScroll(event) {

    // if (this.messagesList[1].hasOwnProperty('breef')) {
    //   return this.isShowMoreMessagesBtn = null;
    // }
    if (this.messagesList.length > 5) {
      const x = event.target.scrollHeight - event.target.scrollTop;
      this.messageScrollService.onScroll(this.messagesWrap);
      if (x > event.target.clientHeight + 300) {
        this.isScrollDownBtn = true;
      } else {
        this.isScrollDownBtn = null;
      }
      const isBriefVisible = this.messagesList[0].hasOwnProperty('brief');

      if (event.target.scrollTop === 0 && isBriefVisible !== true ) {
        this.isShowMoreMessagesBtn = true;
      } else {
        this.isShowMoreMessagesBtn = null;
      }
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
    this.chatService.getPreviousMessages(this.collocutorData.roomId, this.messagesList.length, this.chatType)
      .subscribe(res => {
        if(res[0].length === 0){
          this.isMessages = null;
          return;
        }
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

  private typingEventListener() {
    this.socketService.onTypingListener()
      .subscribe((res: any) => {
        this.typing = this.typingUser === this.userId ? true : false;
      });
    this.typingStoppedEventListener();
  }
  private typingStoppedEventListener() {
    this.socketService.onStopTypingListener()
      .subscribe((res: any) => {

        this.typing = null;
      });
  }


  public swipeEvent(event: any) {
    console.log(event);
    if (event.type === 'swipeleft') {
      this.swipeDirection.emit('swipeleft');
    } else if (event.type === 'swiperight') {
      this.swipeDirection.emit('swipeleft');
    }
  }
}
