import { Component, OnInit, ViewChild, ElementRef, Input, ViewChildren, QueryList, Output, EventEmitter, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { SocketService } from '../../services/socket.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageScrollerService } from '../../services/message-scroller/message-scroller.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { filter, first, takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';


// declare var $: any;

@Component({
  selector: 'app-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.scss'],
  // providers: [MessageScrollerService]
})
export class MessagerComponent implements OnInit, OnDestroy {

  public messageText;
  public messagesList = null;
  private userId;
  private typing = false;
  private time: any;

  public keyword$ = new Subject();
  // tslint:disable-next-line: variable-name
  protected _destroy$ = new Subject();

  @Input() chatType: string;
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
    this.chatService.getPreviousMessages(this.collocutorData.roomId, 0, this.chatType)
      .subscribe((res: any) => {
        this.messagesList = this.filterArrayOnMessTypes(res[0]);
      });

    this.socketService.onMessage()
      .subscribe((newMessage: any) => {

        if (newMessage.type === 'file' && typeof newMessage.message === 'string') {
          newMessage.message = typeof newMessage.message === 'string' ? JSON.parse(newMessage.message) : [];
        }

        this.messagesList.push(newMessage);

      });

    this.keyword$
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(500)
      )
      .subscribe((event: any) => {
        this.typing = false;
        this.socketService.onTypingEvent('stopTyping', this.collocutorData.collocutorId);
      });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public get textInput() {
    return this.textinput.nativeElement;
  }

  public sendMessage(form: NgForm) {

    this.chatService.sentMessage(this.textInput.value, this.collocutorData.roomId, 'string', this.chatType).subscribe(res => {
    });
    form.reset();

    this.messageScrollerService.onMessageScrollBottom();
  }

  public keyDown(event: KeyboardEvent, form: NgForm) {
    this.keyword$.next(event);

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
    // Typing Event
    if (this.typing === false) {
      this.typing = true;
      this.socketService.onTypingEvent('typing', this.collocutorData.collocutorId);
    }
  }


  // open file-uploader

  public openFilesUploader() {
    this.isFileLoaderVisibleChange.emit(true);
  }


  public filterArrayOnMessTypes(arr: any) {
    arr.forEach((el: any) => {
      if (el.type === 'file') {
        el.message = el.message !== '' ? JSON.parse(el.message) : {};

      }
      return el;
    });
    return arr;

  }



}
