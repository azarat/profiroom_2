import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  @Input() userFinance;
  public userCashMoves: any[];
  public paymentsTypes = [
    {
      type: 'income',
      name: 'Пополнение счета'
    },
    {
      type: 'hold',
      name: 'Средства зарезервированы'
    },
    {
      type: 'dealDone',
      name: 'Получение оплаты'
    },
    {
      type: 'dealCanceled',
      name: 'Отмена резирвации средств'
    }
  ];

  constructor() { }

  ngOnInit() {

    this.userCashMoves = this.sortcashByTime(this.userFinance.history);
  }

  private sortcashByTime(arr: any[]) {
    const x = arr.sort((a, b) => {
      return b.created_at.localeCompare(a.created_at);
    });
    return x;
  }

}
