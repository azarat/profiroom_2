import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { mainStatisticConst } from './consts/main-statistic.const';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  @Input() user: UserModel;
  public statsicArr = mainStatisticConst;

  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

  public currentDateEmitting(date) {

  }

}
