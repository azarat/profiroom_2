import { Component, OnInit } from '@angular/core';
import { compressedFinanceInfoConst } from './consts/compressed-finance-info.const';
import { paymentsListConst } from './consts/payments-list.const';

@Component({
  selector: 'app-finace-page',
  templateUrl: './finace-page.component.html',
  styleUrls: ['./finace-page.component.scss']
})
export class FinacePageComponent implements OnInit {
  allStatisticInfo: any[] = compressedFinanceInfoConst;

  paymentsList = paymentsListConst;

  constructor() { }

  ngOnInit() {
  }

}
