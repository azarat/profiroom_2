import { Component, OnInit } from '@angular/core';
import { compressedFinanceInfoConst } from './consts/compressed-finance-info.const';
import { UserFinanceService } from './services/user-finance.service';
import { filter } from 'rxjs/operators';
import { FinanceInterface } from './interfaces/finance.interface';
import { FormControl } from '@angular/forms';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-finance-page',
  templateUrl: './finance-page.component.html',
  styleUrls: ['./finance-page.component.scss']
})
export class FinancePageComponent implements OnInit {

  public userRole: number;
  constructor(
    private userStateService: UserStateService
  ) { }

  ngOnInit() {
    // this.transactions.transactionType = null;
    this.getUserRole();
  }

  private getUserRole() {
    this.userStateService.userState$
      .subscribe(data => {
        this.userRole = data;
      });
  }
}
