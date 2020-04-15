import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { DealService } from '../../services/deal.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() chatType: string; // work or classic chat
  public uploadedBriefFiles: any;
  public collocutorData: CollocutorInterface;
  public isFileLoaderVisible: boolean = null;
  // var if exit from unWritten brief
  public exitFromBriefPopUpVisible: boolean = null;
  public isChat = true;

  public deal: CollocutorInterface;


  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private userStateService: UserStateService,
    private dealService: DealService
  ) { }

  ngOnInit() {
    this._subscribeUserStateChanges();
    this.isChat = true;
    this.subscribeCollocutor();
    this.openNewChatRoom();
    this._subscribeDealInWorkChat();
  }
  ngOnDestroy(): void {
    this.socketService.closeCollocutorSocket(this.chatType);
  }

  // open new chat vs delay to reset messenger template
  public getCurrentRoom(userInfo) {
    this.collocutorData = null; // reset current data of
    setTimeout(() => {
      this.collocutorData = userInfo;
    }, 100);
  }

  private subscribeCollocutor() {
    this.socketService.subscribeOnCollocutorList(this.chatType);
  }

  // open brief feeling if is new and chat after sending brief
  private openNewChatRoom() {
    this.route.queryParams
      .subscribe((res: any) => {
        if (res.hasOwnProperty('offers_id')) {
          console.log('new deal',res);
          // this.collocutorData = res;
          this.getCurrentRoom(res);
        } else if (res.hasOwnProperty('dealId')) {
          this._resetChat();
        } else if(res.hasOwnProperty('dealId')) {

        }
      });
  }

  public resetChat(event) {
    this._resetChat();
  }

  private _subscribeUserStateChanges() {
    this.userStateService.userState$
    .subscribe(
      res => {
        this._resetChat();
      }
    );

  }

  private _resetChat() {
    this.isChat = null;
    setTimeout(() => {
      this.isChat = true;
      this.collocutorData = null;
    }, 100);
  }

  private _subscribeDealInWorkChat() {
    if ( this.chatType === 'work') {
      this.getDealData();
      this._dealUpdating();
    }
  }

  private getDealData() {
    this.dealService.dealData$
    .subscribe(res => {
      this.deal = res;
    });
  }

  private _dealUpdating() {
    this.socketService.dealUpdating()
    .subscribe((res: any) => {
      this.dealService.setDealInfo(res);
    });
  }

}
