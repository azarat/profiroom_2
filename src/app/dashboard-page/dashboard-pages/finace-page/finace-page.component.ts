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


  constructor(

  ) { }

  ngOnInit() {
    // this.transactions.transactionType = null;

  }
}
