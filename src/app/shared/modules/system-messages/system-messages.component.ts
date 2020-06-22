import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { SystemMessagesService } from './services/system-messages.service';
import { LocalizeRouterService } from 'localize-router';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/chat/services/chat.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-system-messages',
  templateUrl: './system-messages.component.html',
  styleUrls: ['./system-messages.component.scss']
})
export class SystemMessagesComponent implements OnInit, OnDestroy {

  @Input() user: UserModel;
  @Input() pageType: string;
  public showMessagesListBlock = false;
  public messageListEmpty = false;
  public systemMessagesArr: any[] = [];
  public newSystemMessages = null;
  public menuOpen = null;
  // public notifiation = {





  //   sentBrief: 'Пришел бриф'
  // };

  constructor(
    private systemMessagesService: SystemMessagesService,
    private chatService: ChatService,
    private socketService: SocketService,
    private localize: LocalizeRouterService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.getNotifications();
    // subscribe to the bellEvents and push it to the notification arr
    this.socketService.checkSystemNotifications()
    .pipe(untilDestroyed(this))
      .subscribe((newNotify: any) => {
        this.systemMessagesArr.unshift(newNotify);
        this.newSystemMessages = true;
        // this.checkListLength();
      });
  }

  private getNotifications() {
    // get all notifications by API
    this.systemMessagesService.systemMessagesList()
    .subscribe((res: any[]) => {
      this.systemMessagesArr = res.reverse();
  });
  }

  // open notification block
  public toggleMessageList() {
    this.showMessagesListBlock = !this.showMessagesListBlock;
    this.newSystemMessages = null;
  }

  // delete single or all notifications from arr by API
  public deleteMessageItem(id, index) {

    this.systemMessagesService.deleteSystemMessage(id)
    .subscribe(res => {
      if (id === 0) {
        this.systemMessagesArr.splice(0);
      } else {
        this.systemMessagesArr.splice(index, 1);
      }
    });

  }

  public openChat(_roomId, id, index, _dealId) {
    this.toggleMessageList();
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');
    this.router.navigate([translatedPath], {
      relativeTo: this.route,
      queryParams: {dealId: _dealId, roomId: _roomId},
    });
  }

}
