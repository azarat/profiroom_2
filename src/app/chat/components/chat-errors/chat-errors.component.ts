import { Component, OnInit } from '@angular/core';
import { ErrorChatMessageService } from '../../services/error-chat-message.service';
import { filter } from 'rxjs/operators';
import { DealService } from '../../services/deal.service';
import { errorTextConst } from '../../consts/error.text.const';

@Component({
  selector: 'app-chat-errors',
  templateUrl: './chat-errors.component.html',
  styleUrls: ['./chat-errors.component.scss']
})
export class ChatErrorsComponent implements OnInit {

  public errorMessage: {type: string, collocutorId: number} = null;
  public errorTexts = errorTextConst;
  public errorMessageText: {type: string, title: string, description: string, btn_cancel: string, btn_submit: string};


  constructor(
    private errorCharMessageService: ErrorChatMessageService,
    private dealService: DealService,
    
  ) { }

  ngOnInit() {
    this.subscribeNotifications();
  }

  private subscribeNotifications() {
    this.errorCharMessageService.errorMessage$
    .pipe(filter((res: any) => !! res))
    .subscribe(res => {
      this.errorMessage = res;
     this.errorMessageText =  errorTextConst.filter(el => {
        return el.type === this.errorMessage.type; 
      })[0];
      console.log(this.errorMessageText)
    })
  }

  public cancel() {
    this.errorCharMessageService.setErrorMessage(null);
    this.errorMessageText = null;
  }

  public onSubmit() {
    if(this.errorMessage.type === 'cancel') {
      this.cancelWork();
    }

    if(this.errorMessage.type === 'makePayment') {
      this.makePayment();
    }
  }


  private cancelWork() {
    this.dealService.cancelWork(this.errorMessage.collocutorId)
    .pipe(filter((res: any) => !!res))
  .subscribe(res => {
    this.cancel();
  });
  }
  
  private makePayment() {
    this.dealService.holdMoney(this.errorMessage.collocutorId)
      .subscribe(res => {
        // this.resetDealData(this.collocutorData.id)
      });
  }

}
