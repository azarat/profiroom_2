import { Component, OnInit } from '@angular/core';
import { compressedFinanceInfoConst } from './consts/compressed-finance-info.const';
import { paymentsListConst } from './consts/payments-list.const';
import { UserFinanceService } from './services/user-finance.service';
import { filter } from 'rxjs/operators';
import { FinanceInterface } from './interfaces/finance.interface';

@Component({
  selector: 'app-finace-page',
  templateUrl: './finace-page.component.html',
  styleUrls: ['./finace-page.component.scss']
})
export class FinacePageComponent implements OnInit {
  // transactionType: string;
  userFinance: FinanceInterface = null;

  transactions = {
    transactionType: null,
    cash: null,
    password: null
  };

  allStatisticInfo: any[] = compressedFinanceInfoConst;

  paymentsList = paymentsListConst;

  constructor(
    private userFinanceService: UserFinanceService
  ) { }

  ngOnInit() {
    this.transactions.transactionType = null;
    this.getFinanceData();
  }

  getFinanceData() {
    console.log('getting data');
    this.userFinanceService.getUserFinanceData()
    .subscribe((res: any) => {
      console.log(res);
      this.allStatisticInfo = res;
    });
  }

}
