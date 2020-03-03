import { Component, OnInit } from '@angular/core';
import { FinanceInterface } from '../../interfaces/finance.interface';
import { FormControl } from '@angular/forms';
import { compressedFinanceInfoConst } from '../../consts/compressed-finance-info.const';
import { UserFinanceService } from '../../services/user-finance.service';

@Component({
  selector: 'app-user-finances',
  templateUrl: './user-finances.component.html',
  styleUrls: ['./user-finances.component.scss']
})
export class UserFinancesComponent implements OnInit {

  // transactionType: string;
  userFinance: FinanceInterface;
  deffaultSelect = new FormControl('null');
  transactions = {
    transactionType: null,
    amount: null,
    password: null
  };

  userCashMoves: any[];

  allStatisticInfo: any[] = compressedFinanceInfoConst;
  constructor(
    private userFinanceService: UserFinanceService
  ) { }

  ngOnInit() {
    this.getFinanceData();
  }

  getFinanceData() {

    this.userFinanceService.getUserFinanceData()
      .subscribe((res: any) => {
        this.userFinance = res[0];
        console.log(res[0]);
        this.userCashMoves = this.sortcashByTime(this.userFinance.history);
      });
  }

  sortcashByTime(arr) {
    const x = arr.sort((a, b) => {
      return b.created_at.localeCompare(a.created_at);
    });
    return x;
  }

  makePayment() {
    this.userFinanceService.makePayment(this.transactions);
    // console.log(this.transactions)
  }

}
