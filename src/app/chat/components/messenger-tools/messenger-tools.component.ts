import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output
} from '@angular/core';
import {
  ChatService
} from '../../services/chat.service';
import {
  LocalStorageService
} from 'src/app/core/services/local-storage.service';
import * as moment from 'moment';

import {
  SocketService
} from '../../../core/services/socket.service';
import {
  CollocutorInterface
} from '../../interfaces/collocutor.interface';
import { trigger } from '@angular/animations';
import { DealService } from '../../services/deal.service';
import { CollocutorService } from '../../services/collocutor.service';
import { ErrorChatMessageService } from '../../services/error-chat-message.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-messenger-tools',
  templateUrl: './messenger-tools.component.html',
  styleUrls: ['./messenger-tools.component.scss']
})
export class MessengerToolsComponent implements OnInit, OnDestroy {

  @Output() noMoney = new EventEmitter<{  }>();

  public collocutorData: CollocutorInterface;
  // public deal: CollocutorInterface;

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
    private socketService: SocketService,
    private collocutorService: CollocutorService,
    private errorChatMessagesService: ErrorChatMessageService
  ) { }
  ngOnDestroy(): void {
  }

  ngOnInit() {
    // this.getDeal();
    this.socketService.subscribeDeal();
    this.getDealData();
    // this._dealUpdating();
  }


  private convertPackagePrice() {
    this.packagePrice = this.collocutorData.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  private checkIsUserFreelancer() {
    const userId = this.localStorageService.getItem('userId').value;
    this.isUserFreelancer = this.collocutorData.freelancer_id === +userId ? true : null; // check is user Freelancer
    console.log(this.isUserFreelancer)
  }

  // getDeal() {
  //   this.dealService.getDealData(this.collocutorData.id)
  //     .subscribe((res: any) => {
  //       this.dealService.setDealInfo(res);
  //     });
  // }

  private getDealData() {
    this.collocutorService.collocutorData$
      .pipe(
        untilDestroyed(this),
        filter((res: any) => !!res)
      )
      .subscribe((res: any) => {
        this.collocutorData = res;
        if (this.collocutorData) {
          this.convertPackagePrice();
          this.checkIsUserFreelancer();
          this.checkDealCanBePayed(); // check does deal can be payed
          this.freelancerStartWorking(); // check does freelancer cen start working
          this.cenDealBeCanceled();
          this.cenDealBeFinished();
          this.isArbiterBtnVisible();
          if (this.collocutorData.workStarted === 1) {
            this.setTimer();
          }
        }
      });
  }


  //  Timer

  private setTimer() {
    if (this.collocutorData.workStarted === 1 && this.collocutorData.history) {
      const dealStartedAt = this.collocutorData.history.filter(el => el.answer === 'workStarted')[0].created_at;
      // const finisherAt = moment(dealStartedAt).add('days', this.collocutorData.amount);
      const finisherAt = moment(moment(new Date(dealStartedAt)).add(this.collocutorData.term, 'days').toDate(), 'M/D/YYYY');
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
    if (this.collocutorData.moneyHolden === 0 || this.collocutorData.dealDone || this.collocutorData.workEnded && this.isUserFreelancer) {
      this.isDealButtonsVisible = null;
    } else if (this.collocutorData.early_closing === 1) {
      // let FreelancerCancel = this.collocutorData.history.includes()
    }
  }

  public holdDealMoney() {
    this.dealService.holdMoney(this.collocutorData.id)
      .subscribe((res: any) => {
        if ( res.message === 'not enough money') {
          this.noMoney.emit(res.amount);
        }
      });
  }

  private checkDealCanBePayed() { // check is user customer, brief submitted and deal status is inProgress
    this.canDealBePayed = (!this.isUserFreelancer && this.collocutorData.moneyHolden !== 1
      && this.collocutorData.early_closing !== 1
      && this.collocutorData.brief === 1 && this.collocutorData.status === "approved" ) ? true : null;
  }

  private freelancerStartWorking() { // check does freelancer cen start working
    console.log('freelancer', this.isUserFreelancer);
    this.canDealBeStarted = this.isUserFreelancer && this.collocutorData.workStarted !== 1 && this.collocutorData.early_closing !== 1
      && this.collocutorData.status !== 'arbiter'
      && this.collocutorData.moneyHolden === 1 && this.collocutorData.status !== 'archived' ? true : null;
  }

  private cenDealBeCanceled() {
    this.isCancelButton = this.collocutorData.early_closing !== 1 && this.collocutorData.dealDone !== 1
    && this.collocutorData.status !== 'arbiter'
      && this.collocutorData.brief === 1 && this.collocutorData.status !== 'archived' ? true : null;
  }

  private cenDealBeFinished() {
    this.isFinishDealButton =
    this.isUserFreelancer && this.collocutorData.status !== 'arbiter' &&
    this.collocutorData.moneyHolden === 1 && this.collocutorData.early_closing !== 1 &&
    this.collocutorData.workStarted === 1 && this.collocutorData.workEnded !== 1 &&
    this.collocutorData.dealDone !== 1 ? true : null;
  }

  private isArbiterBtnVisible() {
    this.isArbiterBtn = this.collocutorData.status !== 'arbiter' && this.collocutorData.workStarted === 1
    && this.collocutorData.dealDone !== 1  && this.collocutorData.early_closing !== 1
    && this.collocutorData.workEnded !== 1 ? true : null;
  }



  // API

  public goToWork() {


    this.dealService.startWork(this.collocutorData.id)
      .subscribe(res => {
        console.log(res);
        // this.resetDealData(this.collocutorData.id)
      });
  }

  public cancelWork() {
    const message = {
      type: 'cancel',
      dealId: this.collocutorData.id
    };

    this.errorChatMessagesService.setErrorMessage(message);

  }

  public finishWork() {
    this.dealService.finishDeal(this.collocutorData.id)
      .subscribe(res => {
        // this.chatService.resetDealInfo(this.collocutorData.id)
      });
  }

  public callArbiter() {
    this.dealService.callToArbiter(this.collocutorData.id)
      .subscribe(res => console.log(res));
  }

}
