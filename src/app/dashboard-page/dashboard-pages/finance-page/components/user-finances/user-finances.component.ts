import { Component, OnInit } from '@angular/core';
import { FinanceInterface } from '../../interfaces/finance.interface';
import { FormControl, NgForm } from '@angular/forms';
import { compressedFinanceInfoConst } from '../../consts/compressed-finance-info.const';
import { UserFinanceService } from '../../services/user-finance.service';

@Component({
  selector: 'app-user-finances',
  templateUrl: './user-finances.component.html',
  styleUrls: ['./user-finances.component.scss']
})
export class UserFinancesComponent implements OnInit {

  public userFinance: FinanceInterface;
  public transactions = {
    transactionType: 'deffault',
    amount: null,
    password: null,
  };
  public paymentsFullSize =  false;
  public userCashMoves: any[];
  public allStatisticInfo: any[] = compressedFinanceInfoConst;
  public submited: boolean = null;
  public errorMessage: boolean = null;
  constructor(
    private userFinanceService: UserFinanceService
  ) { }

  ngOnInit() {
    this.getFinanceData();
  }

  getFinanceData() {
    this.userFinanceService.getUserFinanceData()
      .subscribe((res: any) => {
        this.userFinance = res;
      });
  }



  makePayment(form: NgForm) {
    this.submited = true;
    if (form.invalid) {
      return;
    }
    this.userFinanceService.makePayment(this.transactions)
    .subscribe((res: any) => {
      if (res.message === 'fail') {
        this.errorMessage = true;
      } else {
        this.userFinanceService.ranLiqPay(res);
      }


  });
  }

 public unrollPaymentsList() {
   this.paymentsFullSize = !this.paymentsFullSize;
  }

  public rollPaymentsList() {
    this.paymentsFullSize = false;
  }

  public tryPayAgain() {
    this.errorMessage = null;
  }

}
