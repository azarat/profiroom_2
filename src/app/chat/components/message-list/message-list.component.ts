import { Component, OnInit, AfterViewChecked, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { MessageScrollerService } from '../../services/message-scroller.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, AfterViewChecked, AfterViewInit  {

  @Input() chatRoom: string;
  // @Input() collocutorImg: string;
  @Input() messagesList;



  constructor(
    private chatService: ChatService,
    private messageScrollService: MessageScrollerService
  ) { }

  @ViewChild('messagesWrap', {static: false}) messages: ElementRef;


  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {
    this.messageScrollService.scrollToBottom(this.messages);
  }

  public onScroll() {
    this.messageScrollService.onScroll(this.messages);
  }

}

// 150
