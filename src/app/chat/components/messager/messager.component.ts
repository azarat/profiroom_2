import { Component, OnInit, ViewChild, ElementRef, Input, ViewChildren, QueryList, Output, EventEmitter, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { SocketService } from '../../services/socket.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageScrollerService } from '../../services/message-scroller/message-scroller.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


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
  private userId;
  @Input() collocutorData: CollocutorListModel;
  @Input() isFileLoaderVisible: boolean;
  @Output() isFileLoaderVisibleChange = new EventEmitter<boolean>();

  @ViewChild('textarea', { static: false }) textinput: ElementRef;
  @ViewChildren(MessageListComponent) messagesWrap: QueryList<MessageListComponent>;
  @ViewChildren(MessageListComponent) messages: QueryList<ElementRef>;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private messageScrollerService: MessageScrollerService,
    private localStorageService: LocalStorageService
  ) {
    this.userId = this.localStorageService.getItem('userId').value;
  }



  ngOnInit() {
    this.chatService.getPreviousMessages(this.collocutorData.roomId, 0)
      .subscribe((res: any) => {
        console.log(res)
        this.messagesList = this.filterArrayOnMessTypes(res[0]);
      });

    this.socketService.onMessage()
      .subscribe((newMessage: any) => {

        if (newMessage.type === 'file') {
          newMessage.message =  newMessage.message !== '' ? JSON.parse(newMessage.message) : {};
          // return newMessage.message = JSON.parse(newMessage.message);
          // this.messagesList.push(newMessage);
        } else {
          // this.messagesList.push(newMessage);
        }
        console.log(newMessage)
        this.messagesList.push(newMessage);

        // if (newMessage.message[0].authot === this.userId) {
        //   this.messageScrollerService.onMessageScrollBottom();
        // }

      });

    // console.log('loader visible', this.isFileLoaderVisible);

  }

  public get textInput() {
    return this.textinput.nativeElement;
  }

  public sendMessage(form: NgForm) {

    this.chatService.sentMessage(this.textInput.value, this.collocutorData.roomId, 'string').subscribe(res => {
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


  filterArrayOnMessTypes(arr: any) {
    arr.forEach((el: any) => {
      if (el.type === 'file') {
        el.message = JSON.parse(el.message)
      }
      return el;
    });
    return arr;

  }



}
