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
  @Input() collocutorData: any;
  messageBreef = null;
  messageMoneyHolded
  isUserFreelancer: boolean = null;
  messageClass: string;
  public dealCencel: boolean = null;

  constructor(
    private localStorageService: LocalStorageService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this._CheckMessage();
    this.checkIsUserFreelancer();
    this.changeBtnStyling();
  }

  private _CheckMessage() {
    if (this.systemMessage.message.name === 'approveBreef') {
      this.messageClass = 'breef';
    } else if (this.systemMessage.message.name === 'holdMoney') {
      this.messageClass = 'hold-money';
    } else if (this.systemMessage.message.name === 'workStarted') {
      this.messageClass = 'workStarted';
    } else if (this.systemMessage.message.name === 'DealClosedByCustomer' || this.systemMessage.message.name === 'DealCloseByFreelancer'
    || this.systemMessage.message.name === 'Cancelsubmited') {
      this.messageClass = 'deal-cencel';
    } else if (this.systemMessage.message.name === 'DealFinishedByFreelancer') {
      this.messageClass = 'DealFinishedByFreelancer';
    } else if (this.systemMessage.message.name === 'DealFinished') {
      this.messageClass = 'DealFinished';
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
      // this.resetDealData(this.collocutorData.id)
    })
  }

  public goToWork() {
    this.chatService.startWork(this.collocutorData.id)
    .subscribe(res => {
      console.log(res);
      // this.resetDealData(this.collocutorData.id)
    });
  }


  private changeBtnStyling() {
    if (this.isUserFreelancer && this.systemMessage.message.name === 'DealClosedByCustomer' && this.collocutorData.earlyClosing !== 0) {
      console.log(1);
      return this.dealCencel = true;
    } else if (!this.isUserFreelancer && this.systemMessage.message.name === 'DealCloseByFreelancer'
    && this.collocutorData.earlyClosing !== 0) {
      return this.dealCencel = true;
    } else if (!this.isUserFreelancer && this.systemMessage.message.name === 'DealFinishedByFreelancer') {
      return this.dealCencel = true;
    } else {
      this.dealCencel = null;
    }
  }

  public submitDealCancel() {
    this.chatService.submitDealCancel(this.collocutorData.id)
    .subscribe(res => {
      // this.resetDealData(this.collocutorData.id)
    });
  }

  public submitFinishWork() {
    this.chatService.submitFinishDeal(this.collocutorData.id)
    .subscribe(res => {
      // this.resetDealData(this.collocutorData.id)
    });
  }
  public cancelFinishDeal() {
    this.chatService.cancelFinishDeal(this.collocutorData.id)
    .subscribe(res =>{
      // this.resetDealData(this.collocutorData.id)
    });
  }

private resetDealData(id) {
  // this.chatService.resetDealInfo(id)
}

}
