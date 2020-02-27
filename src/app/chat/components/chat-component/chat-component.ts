import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CollucutorsListInterface } from '../../interfaces/collucotors-list.interface';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() chatType: string;
  uploadedBreefFiles: any;

  public collocutorData: CollucutorsListInterface;
  public isFileLoaderVisible: boolean = null;
  // var if exit from unwritten breef
  public exitFromBreefPopUpVisible: boolean = null;
  public isChat: boolean = null;


  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private userStateService: UserStateService,
  ) { }

  ngOnInit() {
    this.subscribeColucutors();
    this.openNewDeal();
    this._subscribeUserStateChanges();
    this.isChat = true;
  }
  ngOnDestroy(): void {
    this.socketService.closeCollocutorSocket(this.chatType);
  }

  // oen new chat vs delay to reset messager template
  getCurrentRoom(userInfo) {
    this.collocutorData = null;
    setTimeout(() => {
      this.collocutorData = userInfo;
      // this.newDealId = userInfo;
    }, 100);
  }

  private subscribeColucutors() {
    this.socketService.subscribeOnListOfCollucutors(this.chatType);
  }

  // open dealChat if is new
  private openNewDeal() {
    this.route.queryParams
      .pipe(
        filter((res: any) => !!res),
      )
      .subscribe((res) => {
        if (res.hasOwnProperty('offers_id')) {
          this.collocutorData = res;
        }

      });
  }

  public resetChat(event) {
    this._resetChat()
  }
  
  private _subscribeUserStateChanges() {
    this.userStateService.userState$
    .subscribe(
      res => {
        this._resetChat()
      }
    );

  }

  private _resetChat(){
    this.isChat = null;
    setTimeout(() => {
      this.isChat = true;
      this.collocutorData = null;
    }, 100);
  }
}
