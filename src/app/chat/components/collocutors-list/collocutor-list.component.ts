import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../../core/services/socket.service';

//  Chat time converter

import { formatDataFunction } from 'src/app/shared/functions/format-data.function';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { filter, first } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Howl, Howler } from 'howler';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { CollocutorService } from '../../services/collocutor.service';
import { DealService } from '../../services/deal.service';
import { Subscription } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';




const sound = new Howl({
  src: ['/assets/sounds/chat-messages/message.mp3']
});

@Component({
  selector: 'app-collocutor-list',
  templateUrl: './collocutor-list.component.html',
  styleUrls: ['./collocutor-list.component.scss']
})
export class CollocutorListComponent implements OnInit, OnDestroy {

  public collocutors: CollocutorInterface[];
  public lastMessageDate: string;
  @Input() chatType: string;
  public userId: number | any;
  public currentFilterType = 'all';
  private newChatRoomData: {
    id: number,
    roomId: string;
  } = null;
  // @Output() currentRoom = new EventEmitter();
  private currentUserState: number = null; // 1=> free, 2=> customer

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private localStorageService: LocalStorageService,
    private userStateService: UserStateService,
    private route: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService,
    private collocutorService: CollocutorService,
    private dealService: DealService
  ) { }

  ngOnDestroy(): void {
    this.socketService.closeCollocutorSocket(this.chatType);
    this.collocutorService.setCollocutorInfo(null);
  }

  ngOnInit() {
    this.userId = this.localStorageService.getItem('userId').value;
    this._getChatRooms();
    this._checkUserState();
  }

  // Filter function
  public setCurrentType(event: any) {
    this.currentFilterType = event;
  }

  // Get list of collocutors
  private _getChatRooms() {
    this.chatService.getChatRooms(this.chatType)
      .subscribe((res: CollocutorInterface[]) => {
        this.collocutors = this._sortMessagesByTime(res);
        this._isAnyChatOpen();
        this.subscribeCollocutorList();
      });
  }

  //  Check querry params
  private _isAnyChatOpen() {
    this.route.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((res: { offers_id?: any, dealId?: any, id?: any, roomId: string } | any) => {

        if (res.hasOwnProperty('offers_id') && this.chatType === 'work' && this.currentUserState === 2) {
           this._getDealData(res.id);
        } else if (res.hasOwnProperty('dealId') && this.chatType === 'work') {
          // If Work chat
          this._getDealData(res.dealId);
        } else if (res.hasOwnProperty('id') && this.chatType === 'classic') {
          // Classic chat
          this._getCollocutorData(res.id);
        }
        // need to check
        else if (this.chatType === 'work') {
          const translatedPath = this.localize.translateRoute('/dashboard/projects');
          this.router.navigate([translatedPath], {
            relativeTo: this.route,
            queryParams: {},
          });
        }
        this._connectToCurrentChatSocket(res.roomId);
        this._subscribeNewMessages();
      });
  }


  private _connectToCurrentChatSocket(roomId) {
    this.socketService.openChat(roomId);
  }

  private subscribeCollocutorList() {
    this.socketService.subscribeOnCollocutorList(this.chatType);
  }

  private _getCollocutorData(chatId) {
    // Find Active collocutor by chatId
    const currentCollocutor: any = this._findCurrentCollocutor(chatId)[0];
    this.chatService.getCollocutorInformation(currentCollocutor.collocutorId)
      .pipe(
        filter((res: any) => !!res),
        untilDestroyed(this))
      .subscribe((res: any) => {
        this.collocutorService.setCollocutorInfo(res.user);
      });
  }


  private _getDealData(dealId) {
    this.dealService.getDealData(dealId)
      .pipe(
        filter((res: any) => !!res))
        // first())
      .subscribe((res: any) => {
        this.collocutorService.setCollocutorInfo(res);
      });
  }


  private _findCurrentCollocutor(id) {
    return this.collocutors.filter(el => {
      return el.id === +id;
    });
  }

  public openChat(collocutorData) {
    console.log(collocutorData, this.chatType)
    if (this.chatType == 'classic') {
      // clear router from params if click on anther chat
      const translatedClassicPath = this.localize.translateRoute('/dashboard/chat-room');
      this.router.navigate([translatedClassicPath], {
        relativeTo: this.route,
        queryParams: { id: collocutorData.id, roomId: collocutorData.roomId },

      });
    } else if (this.chatType === 'work') {
      // clear router from params if click on anther deal
      const translatedPath = this.localize.translateRoute('/dashboard/projects');
      this.router.navigate([translatedPath], {
        relativeTo: this.route,
        queryParams: { dealId: collocutorData.id, roomId: collocutorData.roomId },
      });
    }
  }

  private _subscribeNewMessages() {
    this.socketService.showNewMessage()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this._pushNewMessage(this.collocutors, res);

      });
  }


  //  Clearing route on brief
  private _checkUserState() {
    this.userStateService.userState$
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if(this.chatType === 'work') {
          if(!this.currentUserState) {
            this.currentUserState = res;
            this._getChatRooms();
            this.collocutorService.setCollocutorInfo(null);
            return;
          } else if(this.currentUserState !== res) {
            this.currentUserState = res;
            this._getChatRooms();
            this.collocutorService.setCollocutorInfo(null);
            const translatedPath = this.localize.translateRoute('/dashboard/projects');

            this.router.navigate([translatedPath], {
              relativeTo: this.route,
            });
          }

          // this._getChatRooms();
          // this.collocutorService.setCollocutorInfo(null);
        }



      });
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

    this._sortMessagesByTime(this.collocutors);

  }

  // Sort Messages new on top
  private _sortMessagesByTime(arr) {
    const x = arr.sort((a, b) => {
      const filedAOrder = a.message.length === 0 ? a.created_at : a.message[0].dateTime;
      const filedBOrder = b.message.length === 0 ? b.created_at : b.message[0].dateTime;
      return filedBOrder.localeCompare(filedAOrder);
    });
    // this.collocutors = x;
    return x;
  }

}
