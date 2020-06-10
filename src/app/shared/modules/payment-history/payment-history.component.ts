import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  @Input() userFinance;
  public userCashMoves: any[];
  public userId = this.localStorageService.getItem('userId').value;
  public paymentsTypes = [
    {
      type: 'income',
      name_recipient: 'dashboard.payment-history.income',
      name_sender: 'dashboard.payment-history.income'
    },
    {
      type: 'hold',
      name_recipient: 'dashboard.payment-history.hold',
      name_sender: 'dashboard.payment-history.hold'
    },
    {
      type: 'dealDone',
      name_recipient: 'dashboard.payment-history.dealDone-recipient',
      name_sender: 'dashboard.payment-history.dealDone-sender'
    },
    {
      type: 'dealCanceled',
      name_recipient: 'dashboard.payment-history.dealCanceled'
    }
  ];

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    console.log(this.userFinance)
    // this.findContragent();
    this.userCashMoves = this.sortcashByTime(this.userFinance.history);
  }

  private sortcashByTime(arr: any[]) {
    const x = arr.sort((a, b) => {
      return b.created_at.localeCompare(a.created_at);
    });
    return x;
  }

}
