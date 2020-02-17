import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CollucutorsListInterface } from '../../interfaces/collucotors-list.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() chatType: string;

  public collocutorData: CollucutorsListInterface;
  public isFileLoaderVisible: boolean = null;
  public newDealId: {
    dealRoom: number,
    offerId: number
  };
  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscribeColucutors();
    this.openNewDeal();
  }
  ngOnDestroy(): void {
    this.socketService.closeCollocutorSocket(this.chatType);
  }

  // oen new chat vs delay to reset messager template
  getCurrentRoom(userInfo) {
    this.collocutorData = null;
    setTimeout(() => {
      this.collocutorData = userInfo;
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
      .subscribe(res => {
        this.newDealId = res;
      });
  }

}
