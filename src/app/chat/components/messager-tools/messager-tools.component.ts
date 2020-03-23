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
  CollucutorsListInterface
} from '../../interfaces/collucotors-list.interface';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-messager-tools',
  templateUrl: './messager-tools.component.html',
  styleUrls: ['./messager-tools.component.scss']
})
export class MessagerToolsComponent implements OnInit {

  @Input() collocutorData: CollocutorListModel;
  public deal: CollucutorsListInterface;

  packagePrice: string;
  isUserFreelancer: boolean = null;
  thsnd = 0;
  hundr = 0;
  tens = 0;
  singlNum = 0;
  isDealBtnsVisible = null;


  // varaibles for buttons

  canDealBePayded: boolean = null;
  canDealBeStarted: boolean = null;
  isCencelButn: boolean = null;
  isFinishDealButn: boolean = null;
  isCancelOrCompleateDealBtn: boolean = null;

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
    this.isUserFreelancer = this.collocutorData.freelanser_id === userId ? true : null; // check is user Freelancer
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

          this.checkDealCanBePayded(); // check does deal can be payded
          this.freelancerStartWorking(); // check does freelancer cen start working
          this.cenDealBeCanceled();
          this.cenDealBeFineshed();
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
      const curentTime = moment(new Date(), 'M/D/YYYY');
      const daysLeft = finisherAt.diff(curentTime, 'days');

      this.getDaysCount(daysLeft);
    }

  }


  private getDaysCount(el: number) {
    // thousands
    this.thsnd = Math.floor(el / 1000);
    let x = el % 1000;
    // hundrets
    this.hundr = Math.floor(x / 100);
    x = x % 100;
    // tens
    this.tens = Math.floor(x / 10);
    x = x % 10;

    this.singlNum = x;
  }

  private showDealButtons() {
    if (this.deal.moneyHolded === 0 || this.deal.dealDone || this.deal.workEnded && this.isUserFreelancer) {
      this.isDealBtnsVisible = null;
    } else if (this.deal.earlyСlosing === 1) {
      // let FreelancerCancel = this.deal.history.includes()
    }
  }

  public holdMoneynDeal() {
    this.chatService.holdMoney(this.collocutorData.id)
      .subscribe(res => {
        // this.resetDealData(this.collocutorData.id)
      });
  }

  private checkDealCanBePayded() { // check is user customer, breef submited and deal status is inProgress
    this.canDealBePayded = (!this.isUserFreelancer && this.deal.moneyHolded !== 1
      && this.deal.breef === 1 && this.deal.status === 'inProgress') ? true : null;
  }

  private freelancerStartWorking() { // check does freelancer cen start working
    this.canDealBeStarted = this.isUserFreelancer && this.deal.workStarted !== 1 && this.deal.earlyСlosing !== 1
      && this.deal.moneyHolded === 1 && this.deal.status !== 'archived' ? true : null;
  }

  private cenDealBeCanceled() {
    this.isCencelButn = this.deal.earlyСlosing !== 1 && this.deal.dealDone !== 1
      && this.deal.breef === 1 && this.deal.status !== 'archived' ? true : null;
  }

  private cenDealBeFineshed() {
    this.isFinishDealButn = this.isUserFreelancer && this.deal.moneyHolded === 1 && this.deal.earlyСlosing !== 1
      && this.deal.workStarted === 1 && this.deal.workEnded !== 1 && this.deal.dealDone !== 1 ? true : null;
  }

  // private cencelOrCompleateDeal() {
  //   this.isCancelOrCompleateDealBtn = !this.isUserFreelancer && this.deal.workEnded === 1
  //     && this.deal.dealDone !== 1 && this.deal.status !== 'archived' ? true : null;
  // }



  // API

  public goToWork() {
    this.chatService.startWork(this.collocutorData.id)
      .subscribe(res => {
        console.log(res);
        // this.resetDealData(this.collocutorData.id)
      });
  }

  public cencelWork() {
    this.chatService.cencelWork(this.collocutorData.id)
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

}
