import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { mainStatisticConst } from './consts/main-statistic.const';
import { ChartDataSets } from 'chart.js';
import { DasboardService } from 'src/app/dashboard-page/services/dashboard.service';
import { monthArrayConvert } from 'src/app/shared/functions/month-array-convert.function';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  @Input() user: UserModel;
  public statsicArr = mainStatisticConst;
  public currentFinanceFilter = 'M';
  public chartLabels: any[] = [];
  // public allStatisticInfo: any[] = compressedFinanceInfoConst;

  constructor(
    private dashboardService: DasboardService
  ) { }

  ngOnInit() {
    this.setMounthLabels();
  }

  public changeWorkStatus(status?: number) {
    if (status) {
      this.user.busy = this.user.busy === status ? status : this.changeFreelancerWorkStatus(status);
    } else {
      this.user.busy = status;
      this.changeFreelancerWorkStatus(status);
    }
    // this.user.busy = this.user.busy === status? status : this.changeFreelancerWorkStatus(status)
  }

  private changeFreelancerWorkStatus(status) {
    this.dashboardService.changeFreelancerWorkStatus({ busy: status });
    return status;
  }


  public changeDateFilter(filterType: string) {
    this.chartLabels = [];
    this.currentFinanceFilter = filterType;
    this.currentFinanceFilter === 'M' ? this.setMounthLabels() : this.setYearsLabels();
  }

  private setYearsLabels() {
    const currentYear = new Date().getFullYear();
    const minYear = 2019;
    if (currentYear - minYear <= 5) {
      for (let i = minYear; i <= currentYear; i++) {
        this.chartLabels.push(i);
      }
      return this.chartLabels;
    } else {
      for (let i = currentYear - 5; i >= currentYear  ; i++) {
        this.chartLabels.push(i);
      }
      return this.chartLabels;
    }
  }
  private setMounthLabels() {
    // weekendArrayConvertFunction()
    const currentMonth = new Date().getMonth() + 1;

    const arr = [];
    for (let i = currentMonth; i > currentMonth - 7; i-- ) { // 7 month before current
      if  (i > 0) {
        arr.unshift(i.toString());
      } else if (i === 0) {
        arr.unshift('12');
      } else if (i < 0) {
        arr.unshift((12 - (i * -1)).toString());
        }
    }
    this.chartLabels = monthArrayConvert(arr);
  }



}
