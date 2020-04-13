import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { SystemMessageInterface } from '../../interfaces/system-message.interface';
import { SystemMessagesService } from './services/system-messages.service';
import { LocalizeRouterService } from 'localize-router';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/chat/services/chat.service';
import { SocketService } from 'src/app/chat/services/socket.service';

@Component({
  selector: 'app-system-messages',
  templateUrl: './system-messages.component.html',
  styleUrls: ['./system-messages.component.scss']
})
export class SystemMessagesComponent implements OnInit {

  @Input() user: UserModel;
  public showMessagesListBlock = false;
  public messageListEmpty = false;
  public systemMessagesArr: any;
  public newSystemMessages = null;

  public systemMessagesTypes = [
    "refuseBreef",
    "approveBreef",
    "inProgress",
    "DealFinished",
    "DealFinishCanceledByCustomer",
    "DealFinishedByFreelancer",
    "CancelSubmited",
    "DealClosedByCustomer",
    "DealCloseByFreelancer",
    "workStarted",
    "holdMoney",
  ];

  constructor(
    private systemMessagesService: SystemMessagesService,
    private chatService: ChatService,
    private socketService: SocketService,
    private localize: LocalizeRouterService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    console.log(this.user.role_id);

    // get all notifications by API
    this.systemMessagesService.systemMessagesList()
    .subscribe(res => {
      this.systemMessagesArr = res;
      this.systemMessagesArr = this.systemMessagesArr.reverse();
      console.log(this.systemMessagesArr);
      this.checkListLength();
    }); 

    // connect to the bellRoom by socket
    this.systemMessagesService.connect();
    
    
    // subscribe to the bellEvents and push it to the notification arr
    this.systemMessagesService.checkSystemNotifications()
    .subscribe((newNotify: any) => {
      this.systemMessagesArr.unshift(newNotify);
      this.newSystemMessages = true;
      this.checkListLength();
    });
  }

  // opne notification block
  public toggleMessageList() {
    this.showMessagesListBlock = !this.showMessagesListBlock;
    this.newSystemMessages = null;
  }

  // delet single or all notifications from arr by API
  public deleteMessageItem(id, index) {

    this.systemMessagesService.deleteSystemMessage(id)
    .subscribe(res => {
      console.log(this.systemMessagesArr);
    }); 
    
    console.log("id", id);
    // console.log("index", index);

    if(id === 0) {
      this.systemMessagesArr.splice(0);
    } else {
      this.systemMessagesArr.splice(index, 1);
    }

    this.checkListLength();
  }

  private checkListLength() {
    if(this.systemMessagesArr.length > 0) {
      this.messageListEmpty = true;
    } else {this.messageListEmpty = false;}
    console.log(this.messageListEmpty);
  }

  public openChat(roomId, id, index) {
    const translatedPath: any = this.localize.translateRoute('/dashboard/projects');
    // this.deleteMessageItem(id, index);    -- для ужадения по клмку на сообщение
    this.router.navigate([translatedPath], {
      relativeTo: this.route,
      queryParams: {},
    });
    // this.socketService.openChat(roomId);    -- для открыия конкретного чата 
  }
  
  
}
