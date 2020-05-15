import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { SystemMessagesService } from './services/system-messages.service';
import { LocalizeRouterService } from 'localize-router';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/chat/services/chat.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-system-messages',
  templateUrl: './system-messages.component.html',
  styleUrls: ['./system-messages.component.scss']
})
export class SystemMessagesComponent implements OnInit {

  @Input() user: UserModel;
  public showMessagesListBlock = false;
  public messageListEmpty = false;
  public systemMessagesArr: any[] = [];
  public newSystemMessages = null;
  public menuOpen = null;
  public notifiation = {
    DealFinished: 'Работа оплачена',
    DealFinishCanceledByCustomer: 'Работа отправлена на доработки',
    DealClosedByCustomer: 'Работа отменина заказчиком',
    holdMoney: 'Средства зарезирвированы',
    refuseBrief: 'Отказ от брифа',
    approveBrief: 'Бриф подтвержден',
    DealFinishedByFreelancer: 'Работа завершина фрилансером',
    CancelSubmitted: 'Фрилансер подтвердил отмену сотрудничества',
    DealCloseByFreelancer: 'Работа отменина фрилансером',
    workStarted: 'Работа начата',
    sentBrief: 'Пришел бриф'
  }

  constructor(
    private systemMessagesService: SystemMessagesService,
    private chatService: ChatService,
    private socketService: SocketService,
    private localize: LocalizeRouterService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getNotifications();    
    // subscribe to the bellEvents and push it to the notification arr
    this.socketService.checkSystemNotifications()
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

      console.log('notifations ',res)
      this.systemMessagesArr = res.reverse();
      // this.checkListLength();
  });
  }

  // open notification block
  public toggleMessageList() {;
    this.showMessagesListBlock = !this.showMessagesListBlock;
    this.newSystemMessages = null;
  }

  // delete single or all notifications from arr by API
  public deleteMessageItem(id, index) {

    this.systemMessagesService.deleteSystemMessage(id)
    .subscribe(res => {
      console.log(this.systemMessagesArr);
    }); 

    if(id === 0) {
      this.systemMessagesArr.splice(0);
    } else {
      this.systemMessagesArr.splice(index, 1);
    }

    // this.checkListLength();
  }

  // private checkListLength() {
  //   this.messageListEmpty = this.systemMessagesArr.length > 0 ? true : false;
  // }

  public openChat(roomId, id, index, dealId) {
    this.toggleMessageList();
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');
    this.router.navigate([translatedPath], {
      relativeTo: this.route,
      queryParams: {dealId: dealId, roomId: roomId},
    });
  }
  
}
