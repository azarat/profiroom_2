import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ChatService } from '../../services/chat.service';
import { DealService } from '../../services/deal.service';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';

@Component({
  selector: 'app-system-messages-in-deals',
  templateUrl: './system-messages-in-deals.component.html',
  styleUrls: ['./system-messages-in-deals.component.scss']
})
export class SystemMessagesInDealsComponent implements OnInit {

  @Input() systemMessage;
  @Input() collocutorData: CollocutorInterface;

  public messageBrief = null;
  public messageMoneyHolden: boolean;
  public isUserFreelancer: boolean = null;
  public messageClass: string;
  public dealCancel: boolean = null;
  public deal: CollocutorInterface;

  constructor(
    private localStorageService: LocalStorageService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this._CheckMessage();
    this.checkIsUserFreelancer();
    this.changeBtnStyling();
    console.log('system message',this.collocutorData)
  }

  private _CheckMessage() {
    if (this.systemMessage.message.name === 'approveBrief') {
      this.messageClass = 'brief';
    } else if (this.systemMessage.message.name === 'holdMoney') {
      this.messageClass = 'hold-money';
    } else if (this.systemMessage.message.name === 'workStarted') {
      this.messageClass = 'workStarted';
    } else if (this.systemMessage.message.name === 'DealClosedByCustomer' || this.systemMessage.message.name === 'DealCloseByFreelancer'
      || this.systemMessage.message.name === 'CancelSubmitted') {
      this.messageClass = 'deal-cancel';
    } else if (this.systemMessage.message.name === 'DealFinishedByFreelancer') {
      this.messageClass = 'DealFinishedByFreelancer';
    } else if (this.systemMessage.message.name === 'DealFinished') {
      this.messageClass = 'DealFinished';
    } else if (this.systemMessage.message.name === 'DealFinishCanceledByCustomer') {
      this.messageClass = 'DealFinishCanceled';
    }else if(this.systemMessage.message.name === 'arbitration') {
      this.messageClass = 'arbiter';
    }
  }

  private checkIsUserFreelancer() {
    const userId = this.localStorageService.getItem('userId').value;
    if (this.collocutorData.freelancer_id === userId) {
      this.isUserFreelancer = true;
    }
  }


  public goToWork() {
    this.chatService.startWork(this.collocutorData.id)
      .subscribe(res => {
        console.log(res);
        // this.resetDealData(this.collocutorData.id)
      });
  }


  private changeBtnStyling() {
    if (this.isUserFreelancer && this.systemMessage.message.name === 'DealClosedByCustomer' && this.collocutorData.early_closing !== 0) {
      return this.dealCancel = true;
    } else if (!this.isUserFreelancer && this.systemMessage.message.name === 'DealCloseByFreelancer'
      && this.collocutorData.early_closing !== 0) {
      return this.dealCancel = true;
    } else if (!this.isUserFreelancer && this.systemMessage.message.name === 'DealFinishedByFreelancer') {
      return this.dealCancel = true;
    } else {
      this.dealCancel = null;
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
      .subscribe(res => {
        // this.resetDealData(this.collocutorData.id)
      });
  }
}
