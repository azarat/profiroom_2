import { Component, OnInit, Input } from '@angular/core';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { ChatService } from '../../services/chat.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-messager-tools',
  templateUrl: './messager-tools.component.html',
  styleUrls: ['./messager-tools.component.scss']
})
export class MessagerToolsComponent implements OnInit {

  @Input() collocutorData: CollocutorListModel;
  packagePrice: string;
  deal = null;
  isUserFreelancer: boolean = null;
  thsnd: number = 0;
  hundr: number = 0;
  tens: number = 0;
  singlNum: number = 0;

  constructor(
    private chatService: ChatService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.subscribeDealData();
    this.getDeal();
    this.checkIsUserFreelancer();
  }


  private convertPackagePrice() {
    this.packagePrice = this.deal.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  private checkIsUserFreelancer() {
    const userId = this.localStorageService.getItem('userId').value;
    if (this.collocutorData.freelanser_id === userId) {
      this.isUserFreelancer = true;
    }
  }

  getDeal() {
    this.chatService.getDealData(this.collocutorData.id)
    .subscribe(res => {
      this.chatService.resetDealInfo(res);
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

  private subscribeDealData() {
    this.chatService.dealInfo$
    .subscribe(res => {
      this.deal = res;
      console.log('DEalData', res);
      if(this.deal) {
        this.convertPackagePrice();
        this.setTimer();
      }
    });
  }


  //  Timer

  private setTimer() {

    const dealStartedAt = this.deal.history.filter(el => el.answer === 'workStarted')[0].created_at;
    // const finisherAt = moment(dealStartedAt).add('days', this.deal.amount);
    const finisherAt = moment(moment(new Date(dealStartedAt)).add(this.deal.term, 'days').toDate(), 'M/D/YYYY');
    const curentTime = moment(new Date(), 'M/D/YYYY');
    let daysLeft = finisherAt.diff(curentTime, 'days')

    this.getDaysCount(daysLeft);
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


}
