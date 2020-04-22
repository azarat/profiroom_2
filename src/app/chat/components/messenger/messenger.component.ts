import { Component, OnInit, ViewChild, ElementRef, Input, ViewChildren, QueryList, Output, EventEmitter, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageScrollService } from '../../services/message-scroll/message-scroll.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { filter, first, takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { CollocutorService } from '../../services/collocutor.service';


// declare var $: any;

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  // providers: [MessageScrollerService]
})
export class MessengerComponent implements OnInit, OnDestroy {

  public messageText;
  public messagesList = null;
  private userId;
  private typing = false;
  private time: any;
  public canChatting = true;
  public keyword$ = new Subject();
  public  collocutorData: CollocutorInterface;
  protected _destroy$ = new Subject();
  public chatHided: boolean = null;
  public dealCanBeRated: boolean = null;
  @Input() chatType: string;
  // @Input() deal: CollocutorInterface;
 
  @Input() isFileLoaderVisible: boolean;
  @Output() isFileLoaderVisibleChange = new EventEmitter<boolean>();

  @ViewChild('textarea', { static: false }) textareaInput: ElementRef;
  @ViewChildren(MessageListComponent) messagesWrap: QueryList<MessageListComponent>;
  @ViewChildren(MessageListComponent) messages: QueryList<ElementRef>;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private messageScrollService: MessageScrollService,
    private localStorageService: LocalStorageService,
    private collocutorService: CollocutorService ,
  ) {
    this.userId = this.localStorageService.getItem('userId').value;
  }



  ngOnInit() {
    this.getDealData();
    
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
    // console.log(this.collocutorData);
    this._isChatHidden();
    
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public get textInput() {
    return this.textareaInput.nativeElement;
  }

  public sendMessage(form: NgForm) {

    this.chatService.sendMessage(this.textInput.value, this.collocutorData.roomId, 'string', this.chatType).subscribe(res => {
    });
    form.reset();

    this.messageScrollService.onMessageScrollBottom();
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

  // open file-loader
  public openFilesLoader() {
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

  // Close chat if deal is done
  private _isChatHidden() {
    this.collocutorData && (this.collocutorData.workEnded === 1 || this.collocutorData.dealDone === 1) ? this.chatHided = true : this.chatHided = null;
  }

  private getDealData() {
    this.collocutorService.collocutorData$
    .subscribe(res => {
      this.collocutorData = res;
      console.log('collocutorData', this.collocutorData)
      this.hideMessageInput();
      this.rateDeal();
    });
  }

  private hideMessageInput() {
    this.canChatting = this.collocutorData && this.chatType === 'work' && this.collocutorData.early_closing === 1 || this.collocutorData && this.collocutorData.dealDone === 1
    || this.collocutorData && this.collocutorData.dealCanceled === 1  || this.collocutorData && this.collocutorData.workEnded === 1 ? null : true;
  }

  private rateDeal() {
    this.dealCanBeRated = this.collocutorData && this.collocutorData.status !== 'archived' && 
    (this.collocutorData.dealDone === 1 || this.collocutorData.canceled === 1)? true : null;
  }

}
