import { Component, OnInit } from '@angular/core';
import { compressedFinanceInfoConst } from './consts/compressed-finance-info.const';
import { UserFinanceService } from './services/user-finance.service';
import { filter } from 'rxjs/operators';
import { FinanceInterface } from './interfaces/finance.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-finace-page',
  templateUrl: './finace-page.component.html',
  styleUrls: ['./finace-page.component.scss']
})
export class FinacePageComponent implements OnInit {
  // transactionType: string;
  userFinance: FinanceInterface;
  deffaultSelect = new FormControl('null');
  transactions = {
    transactionType: null,
    cash: null,
    password: null
  };

  userCashMoves: any[];

  allStatisticInfo: any[] = compressedFinanceInfoConst;

  constructor(
    private userFinanceService: UserFinanceService
  ) { }

  ngOnInit() {
    // this.transactions.transactionType = null;
    this.getFinanceData();
  }

  getFinanceData() {

    this.userFinanceService.getUserFinanceData()
    .subscribe((res: any) => {
      this.userFinance = res[0];
      console.log(res[0]);
      this.userCashMoves = this.sortcashByTime(this.userFinance.history)
    });
  }

  sortcashByTime(arr) {
    const x = arr.sort((a, b) => {
      return b.created_at.localeCompare(a.created_at);
    });
    return x;
  }



}
