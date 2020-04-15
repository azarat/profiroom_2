import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  CollocutorListModel
} from 'src/app/models/chat/collocutors-list.model';
import {
  ChatService
} from '../../services/chat.service';
import {
  LocalStorageService
} from 'src/app/core/services/local-storage.service';
import * as moment from 'moment';
import {
  DealService
} from '../../services/deal.service';
import {
  SocketService
} from '../../services/socket.service';
import {
  CollocutorInterface
} from '../../interfaces/collocutor.interface';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-messenger-tools',
  templateUrl: './messenger-tools.component.html',
  styleUrls: ['./messenger-tools.component.scss']
})
export class MessengerToolsComponent implements OnInit {

  @Input() collocutorData: CollocutorListModel;
  public deal: CollocutorInterface;

  public packagePrice: string;
  public isUserFreelancer: boolean = null;
  public thousand = 0;
  public hundred = 0;
  public tens = 0;
  public singleNum = 0;
  public isDealButtonsVisible = null;

  // variables for buttons
  public canDealBePayed: boolean = null;
  public canDealBeStarted: boolean = null;
  public isCancelButton: boolean = null;
  public isFinishDealButton: boolean = null;
  public isCancelOrCompleatDealBtn: boolean = null;
  public isArbiterBtn: boolean = null;

  constructor(
    private chatService: ChatService,
    private localStorageService: LocalStorageService,
    private dealService: DealService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.getDeal();
    this.socketService.subscribeDeal();
    this.getDealData();
    // this._dealUpdating();
    this.checkIsUserFreelancer();
    console.log(this.deal);
  }


  private convertPackagePrice() {
    this.packagePrice = this.deal.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  private checkIsUserFreelancer() {
    const userId = this.localStorageService.getItem('userId').value;
    this.isUserFreelancer = this.collocutorData.freelancer_id === userId ? true : null; // check is user Freelancer
  }

  getDeal() {
    this.chatService.getDealData(this.collocutorData.id)
      .subscribe((res: any) => {
        this.dealService.setDealInfo(res);
      });
  }

  private getDealData() {
    this.dealService.dealData$
      .subscribe(res => {
        console.log('updated deal', res);
        this.deal = res;
        if (this.deal) {
          this.convertPackagePrice();

          this.checkDealCanBePayed(); // check does deal can be payed
          this.freelancerStartWorking(); // check does freelancer cen start working
          this.cenDealBeCanceled();
          this.cenDealBeFinished();
          this.isArbiterBtnVisible();
          if (this.deal.workStarted === 1) {
            this.setTimer();
          }
        }
      });
  }


  //  Timer

  private setTimer() {
    if (this.deal.workStarted === 1) {
      const dealStartedAt = this.deal.history.filter(el => el.answer === 'workStarted')[0].created_at;
      // const finisherAt = moment(dealStartedAt).add('days', this.deal.amount);
      const finisherAt = moment(moment(new Date(dealStartedAt)).add(this.deal.term, 'days').toDate(), 'M/D/YYYY');
      const currentTime = moment(new Date(), 'M/D/YYYY');
      const daysLeft = finisherAt.diff(currentTime, 'days');

      this.getDaysCount(daysLeft);
    }

  }


  private getDaysCount(el: number) {
    // thousands
    this.thousand = Math.floor(el / 1000);
    let x = el % 1000;
    // hundreds
    this.hundred = Math.floor(x / 100);
    x = x % 100;
    // tens
    this.tens = Math.floor(x / 10);
    x = x % 10;

    this.singleNum = x;
  }

  private showDealButtons() {
    if (this.deal.moneyHolden === 0 || this.deal.dealDone || this.deal.workEnded && this.isUserFreelancer) {
      this.isDealButtonsVisible = null;
    } else if (this.deal.early_closing === 1) {
      // let FreelancerCancel = this.deal.history.includes()
    }
  }

  public holdDealMoney() {
    this.chatService.holdMoney(this.collocutorData.id)
      .subscribe(res => {
        // this.resetDealData(this.collocutorData.id)
      });
  }

  private checkDealCanBePayed() { // check is user customer, brief submitted and deal status is inProgress
    this.canDealBePayed = (!this.isUserFreelancer && this.deal.moneyHolden !== 1
      && this.deal.brief === 1 && this.deal.status === 'inProgress') ? true : null;
  }

  private freelancerStartWorking() { // check does freelancer cen start working
    this.canDealBeStarted = this.isUserFreelancer && this.deal.workStarted !== 1 && this.deal.early_closing !== 1 && this.deal.status !== 'arbiter' 
      && this.deal.moneyHolden === 1 && this.deal.status !== 'archived' ? true : null;
  }

  private cenDealBeCanceled() {
    this.isCancelButton = this.deal.early_closing !== 1 && this.deal.dealDone !== 1 && this.deal.status !== 'arbiter' 
      && this.deal.brief === 1 && this.deal.status !== 'archived' ? true : null;
  }

  private cenDealBeFinished() {
    this.isFinishDealButton = this.isUserFreelancer && this.deal.status !== 'arbiter'  && this.deal.moneyHolden === 1 && this.deal.early_closing !== 1
      && this.deal.workStarted === 1 && this.deal.workEnded !== 1 && this.deal.dealDone !== 1 ? true : null;
  }

  private isArbiterBtnVisible() {
    this.isArbiterBtn = this.deal.moneyHolden === 1 && this.deal.status !== 'arbiter' && this.deal.dealDone !== 1 
    && this.deal.workEnded !== 1 ? true : null
  }



  // API

  public goToWork() {
    this.chatService.startWork(this.collocutorData.id)
      .subscribe(res => {
        console.log(res);
        // this.resetDealData(this.collocutorData.id)
      });
  }

  public cancelWork() {
    this.chatService.cancelWork(this.collocutorData.id)
      .subscribe(res => {
        // this.chatService.resetDealInfo(this.collocutorData.id);
      });
  }

  public finishWork() {
    this.chatService.finishDeal(this.collocutorData.id)
      .subscribe(res => {
        // this.chatService.resetDealInfo(this.collocutorData.id)
      });
  }

  public callArbiter() {
    this.dealService.callToArbiter(this.collocutorData.id)
    .subscribe(res => console.log(res));
  }

}
