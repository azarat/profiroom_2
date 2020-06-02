import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../../core/services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { CollocutorService } from '../../services/collocutor.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() chatType: string;
  uploadedBriefFiles: any;

  public collocutorData: CollocutorInterface = null;
  public isFileLoaderVisible: boolean = null;
  // var if exit from unWritten brief
  public exitFromBriefPopUpVisible: boolean = null;
  public isChat = true;
  public moneyRequired = null;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private userStateService: UserStateService,
    private collocutorService: CollocutorService
  ) { }

  ngOnInit() {
    this.getDealData();
    this.subscribeCollocutorList();
    this._dealUpdating();
  }
  ngOnDestroy(): void {
    this.socketService.closeCollocutorSocket(this.chatType);
    this.collocutorService.setCollocutorInfo(null);
  }

  private subscribeCollocutorList() {
    this.socketService.subscribeOnCollocutorList(this.chatType);
  }

  public resetChat(event) {
    this._resetChat();
  }


  private _resetChat() {
    this.isChat = null;
    setTimeout(() => {
      this.isChat = true;
    }, 100);
  }

  private getDealData() {
    this.collocutorService.collocutorData$
    .pipe(untilDestroyed(this))
    .subscribe(res => {
      this.collocutorData = res;
    });
  }

  private _dealUpdating() {
    this.socketService.dealUpdating()
    .subscribe((res: any) => {
      this.collocutorService.setCollocutorInfo(res);
    });
  }

  public openPayment(e) {
    this.moneyRequired = e;
    console.log(e)
  }


}
