import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  @Input() userFinance;
  public userCashMoves: any[];

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
