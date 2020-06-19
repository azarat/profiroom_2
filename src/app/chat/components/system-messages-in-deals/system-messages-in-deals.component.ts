import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ChatService } from '../../services/chat.service';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { DealService } from '../../services/deal.service';
import { CollocutorService } from '../../services/collocutor.service';

@Component({
  selector: 'app-system-messages-in-deals',
  templateUrl: './system-messages-in-deals.component.html',
  styleUrls: ['./system-messages-in-deals.component.scss']
})
export class SystemMessagesInDealsComponent implements OnInit {

  @Input() systemMessage;
  public collocutorData: CollocutorInterface;

  public messageBrief = null;
  public messageMoneyHolden: boolean;
  public isUserFreelancer: boolean = null;
  public messageClass: string;
  public dealCancel: boolean = null;
  public deal: CollocutorInterface;

  constructor(
    private localStorageService: LocalStorageService,
    private dealService: DealService,
    private collocutorService: CollocutorService
  ) { }

  ngOnInit() {
    this.getDealData();
    this._CheckMessage();

  }

  private getDealData() {
    this.collocutorService.collocutorData$
    .subscribe(res => {
      this.collocutorData = res;
      this.checkIsUserFreelancer();
      this.changeBtnStyling();

    });
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
    } else if (this.systemMessage.message.name === 'arbitration') {
      this.messageClass = 'arbiter';
    }
  }

  private checkIsUserFreelancer() {
    if(this.collocutorData) {
      const userId = Number(this.localStorageService.getItem('userId').value);
      if (this.collocutorData.freelancer_id === userId) {
        this.isUserFreelancer = true;
      }
    }

  }


  public goToWork() {
    this.dealService.startWork(this.collocutorData.id)
      .subscribe(res => {
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
    this.dealService.submitDealCancel(this.collocutorData.id);
  }

  public submitFinishWork() {
    this.dealService.submitFinishDeal(this.collocutorData.id)
    .subscribe()
  }
  public cancelFinishDeal() {
    console.log(this.collocutorData.id)
    this.dealService.cancelFinishDeal(this.collocutorData.id)
    .subscribe()
  }
}
