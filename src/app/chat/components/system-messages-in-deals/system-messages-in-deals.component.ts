import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-system-messages-in-deals',
  templateUrl: './system-messages-in-deals.component.html',
  styleUrls: ['./system-messages-in-deals.component.scss']
})
export class SystemMessagesInDealsComponent implements OnInit {

  @Input() systemMessage;
  @Input() collocutorData;
  messageBreef = null;
  messageMoneyHolded
  isUserFreelancer: boolean = null;
  messageClass: string;

  constructor(
    private localStorageService: LocalStorageService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this._CheckMessage();
    console.log(this.systemMessage)
    this.checkIsUserFreelancer();
  }

  private _CheckMessage() {
    if (this.systemMessage.message.name === 'approveBreef') {
      this.messageClass = 'breef'
    } else if(this.systemMessage.message.name === 'holdMoney') {
      this.messageClass = 'hold-money'
    }
  }

  private checkIsUserFreelancer() {
    const userId = this.localStorageService.getItem('userId').value;
    if (this.collocutorData.freelanser_id === userId) {
      this.isUserFreelancer = true;
    }
  }

  public holdMoneynDeal() {
    this.chatService.holdMoney(this.collocutorData.id)
    .subscribe(res => {
      console.log(res);
    })
  }



}
