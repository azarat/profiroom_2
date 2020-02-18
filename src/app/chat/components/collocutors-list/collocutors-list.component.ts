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
    // this.openNewDeal();
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
        console.log(res)
        this._sortMessagesByTime(this.collocutors);
      });
  }

  // open dealChat if is new
  // private openNewDeal() {
  //   this.route.queryParams
  //     .pipe(
  //       filter((res: any) => !!res),
  //     )
  //     .subscribe(res => {
  //       this.openChat(+res.dealRoom);
  //     });
  // }

  private _subscribeNewMessages() {
    this.socketService.showNewMessage()
      .subscribe(res => {
        this._pushNewMessage(this.collocutors, res);
        this._sortMessagesByTime(this.collocutors);
      });
  }

  public openChat(userinfo) {
    this.currentRoom.emit(userinfo);
    this.socketService.openChat(userinfo.roomId);

    // clear router from params if click on anther deal
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');
    console.log('event')
    this.router.navigate([translatedPath], {
      relativeTo: this.route,
      queryParams: {},
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

  }

  private _sortMessagesByTime(arr) {
    const x = arr.sort((a, b) => {
      return b.message[0].dateTime.localeCompare(a.message[0].dateTime);
    });
    this.collocutors = x;
  }

}
