import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { plainToClass } from 'class-transformer';

//  Chat time converter

import { formatDataFunction } from 'src/app/shared/functions/format-data.function';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Howl, Howler } from 'howler';
import { CollucutorsListInterface } from '../../interfaces/collucotors-list.interface';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';




const sound = new Howl({
  src: ['/assets/sounds/chat-messages/message.mp3']
});

@Component({
  selector: 'app-collocutors-list',
  templateUrl: './collocutors-list.component.html',
  styleUrls: ['./collocutors-list.component.scss']
})
export class CollocutorsListComponent implements OnInit {

  public collocutors: CollucutorsListInterface[];
  public lastMessageDate: string;
  @Input() chatType: string;
  public userId;
  currentFilterType: string = 'all';

  @Output() currentRoom = new EventEmitter();

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private localStorageService: LocalStorageService,
    private userStateService: UserStateService,
    private route: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService,
  ) { }

  ngOnInit() {
    this.userId = this.localStorageService.getItem('userId').value;
    this._subscribeNewMessages();
    this.checkUserState();
    this._getChatRooms();
  }

  private checkUserState() {
    this.userStateService.userState$
      .subscribe(res => {
        this._getChatRooms();
      });
  }

  private _getChatRooms() {
    this.chatService.getChatRooms(this.chatType)
      .subscribe((res: CollucutorsListInterface[]) => {
        this.collocutors = res;
        console.log(this.collocutors)
        this._sortMessagesByTime(this.collocutors);
        this.openDealAfterBreefSubmit();
      });
  }

  private _subscribeNewMessages() {
    this.socketService.showNewMessage()
      .subscribe(res => {
        this._pushNewMessage(this.collocutors, res);
        this._sortMessagesByTime(this.collocutors);
      });
  }

  public openChat(userinfo) {
    this._openChat(userinfo);

    if (this.chatType === 'work') {
      // clear router from params if click on anther deal
      const translatedPath: any = this.localize.translateRoute('/dashboard/projects');

      this.router.navigate([translatedPath], {
        relativeTo: this.route,
        queryParams: {},
      });
    }
  }
  //  separate function to connect chatRoom
  private _openChat(userinfo) {
    this.currentRoom.emit(userinfo);
    this.socketService.openChat(userinfo.roomId);
  }

  private _pushNewMessage(arr, obj: any) {
    if (arr.length !== 0) {
      const foundIndex = arr.findIndex(x => x.roomId === obj.roomId);
      this.collocutors[foundIndex] = obj;
    } else {
      this.collocutors.push(obj);
    }
    if (+(obj.message[0].author) !== this.userId && obj.unread !== 0) {
      sound.play();
    }

  }

  private _sortMessagesByTime(arr) {
    const x = arr.sort((a, b) => {
      const filedAOrder = a.message.length === 0 ? a.created_at : a.message[0].dateTime;
      const filedBOrder = b.message.length === 0 ? b.created_at : b.message[0].dateTime;
      return filedBOrder.localeCompare(filedAOrder);
    });
    this.collocutors = x;
  }

  //  open deal After breef submitting

  private openDealAfterBreefSubmit() {
    this.route.queryParams
      .pipe(
        filter((res: any) => !!res),
      )
      .subscribe((res: any) => {
        if (res.hasOwnProperty('dealId')) {
          // let dealId = Number(res.dealId);
          const activeDeal = this.collocutors.find(collocutor => collocutor.id === +res.dealId);
          this._openChat(activeDeal);
        }

      });
  }

  public setCurrentType(event: any) {
    console.log(event)
    this.currentFilterType = event;
  }

  private checkIsDealNew() {

  }
}
