import { Component, OnInit, AfterViewChecked, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { MessageScrollerService } from '../../services/message-scroller/message-scroller.service';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  // providers:  [ MessageScrollerService ]
})
export class MessageListComponent implements OnInit, AfterViewChecked {

  @Input() chatRoom: string;
  @Input() messagesList: any[];

  constructor(
    private chatService: ChatService,
    private messageScrollerService: MessageScrollerService
  ) { }

  @ViewChild('messagesWrap', {static: false}) messagesWrap: ElementRef;
  @ViewChildren('messagesWrap') messages: QueryList<ElementRef>;

  ngOnInit() {
    this.messageScrollerService.onMessageScrollBottom();
  }

  ngAfterViewChecked() {
    this.messageScrollerService.scrollToBottom(this.messagesWrap);
  }

  public onScroll() {
    this.messageScrollerService.onScroll(this.messagesWrap);
  }
}

