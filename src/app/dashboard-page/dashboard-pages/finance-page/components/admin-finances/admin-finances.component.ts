import { Component, OnInit } from '@angular/core';
import { FinanceInterface } from '../../interfaces/finance.interface';
import { FormControl } from '@angular/forms';
import { compressedFinanceInfoConst } from '../../consts/compressed-finance-info.const';
import { UserFinanceService } from '../../services/user-finance.service';

@Component({
  selector: 'app-admin-finances',
  templateUrl: './admin-finances.component.html',
  styleUrls: ['./admin-finances.component.scss']
})
export class AdminFinancesComponent implements OnInit {

  // transactionType: string;
  public userFinance: FinanceInterface;
  public deffaultSelect = new FormControl('null');
  public transactions = {
    transactionType: null,
    amount: null,
    password: null
  };
  public paymentsFullSize =  false;
  public userCashMoves: any[];

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


  public unrollPaymentsList() {
    this.paymentsFullSize = !this.paymentsFullSize;
   }

   public rollPaymentsList() {
     this.paymentsFullSize = false;
   }

}
