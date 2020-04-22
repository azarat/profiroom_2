import { Component, OnInit, Input } from '@angular/core';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { ChatService } from '../../services/chat.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { DealService } from '../../services/deal.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-brief-message-showing',
  templateUrl: './brief-message-showing.component.html',
  styleUrls: ['./brief-message-showing.component.scss']
})
export class BriefMessageShowingComponent implements OnInit {

  @Input() briefMessage: {};
  @Input() collocutorData: CollocutorInterface;
  public userState;
  public isBriefElVisible = null;
  public userId;
  public briefItems: {
    title: string;
    answer: any
    isAnswerArr?: boolean
  }[] = null;
  public deal: CollocutorInterface;
  public dealApproved;

  buttonText = 'развернуть';

  constructor(
    // private userStateService: UserStateService,
    private chatService: ChatService,
    private localStorageService: LocalStorageService,
    private dealService: DealService
  ) { }

  ngOnInit() {
    this.userId = this.localStorageService.getItem('userId').value;
    this.convertObjToArr();
    // this.userStateService.userState$.subscribe(res => {
    //   this.userState = res;
    // })
    this.getDealData();

    console.log('Brief', this.collocutorData)
  }

  private convertObjToArr() {
    this.briefItems = [];
    for (let [key, value] of Object.entries(this.briefMessage)) {

      this.briefItems.push({
        title: key,
        answer: value
      });
    }
    this.briefItems.forEach(el => {
      if (Array.isArray(el.answer)) {
        el.isAnswerArr = true;
      }
    });
  }

  public approveBrief() {
    this.chatService.approveBrief(this.collocutorData.id)
    .subscribe(res => {
      console.log(res);
    });
  }

  public refuseBrief() {
    this.chatService.refuseBrief(this.collocutorData.id)
    .subscribe(res => {
      console.log('refuse', res);
    });
  }

  public showHideBrief() {

    this.isBriefElVisible = this.isBriefElVisible === null? this.isBriefElVisible = true : !this.isBriefElVisible;

    this.buttonText = this.isBriefElVisible === true ? 'свернуть' : 'развернуть';

  }

  private getDealData() {
    this.dealService.dealData$
    .subscribe(res => {
      this.deal = res;
      if(this.deal) {
        this.isDealApproved();
      }
    });
  }

  private isDealApproved() {
    this.dealApproved  = this.deal.history.find(el => el.answer === 'approveBrief');
  }
}
