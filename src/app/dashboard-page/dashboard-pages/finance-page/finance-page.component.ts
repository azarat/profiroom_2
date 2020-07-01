import { Component, OnInit } from '@angular/core';
import { compressedFinanceInfoConst } from './consts/compressed-finance-info.const';
import { UserFinanceService } from '../../../core/services/user-finance.service';
import { filter } from 'rxjs/operators';
import { FinanceInterface } from './interfaces/finance.interface';
import { FormControl } from '@angular/forms';
import { UserStateService } from '../../services/user-state.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-finance-page',
  templateUrl: './finance-page.component.html',
  styleUrls: ['./finance-page.component.scss']
})
export class FinancePageComponent implements OnInit {

  public userRole: number;
  constructor(
    private userStateService: UserStateService,
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Финансы');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Биржа удаленных работников для найма фрилансеров быстро, недорого, выполнение работы качественно и в срок. Найдите своего идеального фриансера!' }
    );
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
