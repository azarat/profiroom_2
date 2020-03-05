import { Component, OnInit, Input } from '@angular/core';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { ChatService } from '../../services/chat.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-breef-message-showing',
  templateUrl: './breef-message-showing.component.html',
  styleUrls: ['./breef-message-showing.component.scss']
})
export class BreefMessageShowingComponent implements OnInit {

  @Input() breefMessage: {};
  @Input() collocutorData: CollocutorListModel;
  public userState;
  public isBreefElVisible = null;
  public userId;
  BreefItems: {
    title: string;
    answer: any
    isanswerArr?: boolean
  }[] = null;

  constructor(
    // private userStateService: UserStateService,
    private chatService: ChatService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.userId = this.localStorageService.getItem('userId').value;
    this.convertObjToArr();
    // this.userStateService.userState$.subscribe(res => {
    //   this.userState = res;
    // })
  }

  private convertObjToArr() {
    this.BreefItems = [];
    for (let [key, value] of Object.entries(this.breefMessage)) {

      this.BreefItems.push({
        title: key,
        answer: value
      });
    }
    this.BreefItems.forEach(el => {
      if (Array.isArray(el.answer)) {
        el.isanswerArr = true;
      }
    });
  }

  public approveBreef() {
    this.chatService.approveBreef(this.collocutorData.id)
    .subscribe(res => {
      console.log(res);
    });
  }

  public refuseBreef() {
    this.chatService.refuseBreef(this.collocutorData.id)
    .subscribe(res => {
      console.log('refuse', res);
    });
  }

  showHideBreef() {
    if (this.isBreefElVisible === null) {
      this.isBreefElVisible = true;
    } else {
      this.isBreefElVisible = !this.isBreefElVisible;
    }
  }
}
