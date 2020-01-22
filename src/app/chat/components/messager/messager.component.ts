import { Component, OnInit, ViewChild, ElementRef, Input, ViewChildren, QueryList, Output, EventEmitter, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { SocketService } from '../../services/socket.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageScrollerService } from '../../services/message-scroller/message-scroller.service';


// declare var $: any;

@Component({
  selector: 'app-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.scss'],
  // providers: [MessageScrollerService]
})
export class MessagerComponent implements OnInit {

  public messageText;
  public messagesList = [];
  @Input() collocutorData: CollocutorListModel;
  @Input() isFileLoaderVisible: boolean;
  @Output() isFileLoaderVisibleChange = new EventEmitter<boolean>();

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private messageScrollerService: MessageScrollerService
  ) { }

  @ViewChild('textinput', { static: false }) textinput: ElementRef;
  @ViewChildren(MessageListComponent) messagesWrap: QueryList<MessageListComponent>;
  @ViewChildren(MessageListComponent) messages: QueryList<ElementRef>;

  ngOnInit() {
    this.chatService.getPreviousMessages(this.collocutorData.roomId)
      .subscribe((res: any) => {

        this.messagesList = res[0];
        console.log(this.messagesList);
      });

    this.socketService.onMessage()
      .subscribe(newMessage => {
        console.log(newMessage);
        this.messagesList.push(newMessage);

      });

    // console.log('loader visible', this.isFileLoaderVisible);

  }

  public get textInput() {
    return this.textinput.nativeElement;
  }

  public sendMessage(form: NgForm) {

    this.chatService.sentMessage(this.textInput.value, this.collocutorData.roomId).subscribe(res => {
    });
    form.reset();

    this.messageScrollerService.onMessageScrollBottom();
  }

  public triggerFunction(event: any, form: NgForm) {
    if (event.ctrlKey && event.key === 'Enter') {
      /*
        cannot make textarea produce a next line.
      */
      const text: any = document.getElementById('message');
      text.value += '\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage(form);
    }
  }

  // open file-uploader

  openFilesUploader() {
    this.isFileLoaderVisibleChange.emit(true);
  }
}
