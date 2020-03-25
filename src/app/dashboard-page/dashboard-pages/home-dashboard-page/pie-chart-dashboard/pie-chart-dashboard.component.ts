import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-pie-chart-dashboard',
  templateUrl: './pie-chart-dashboard.component.html',
  styleUrls: ['./pie-chart-dashboard.component.scss']
})
export class PieChartDashboardComponent implements OnInit {

  private compleatedDeals: string;
  private inProgress: string;
  private falledDeals: string;
  private centerText: string;


  chart: any;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translateCompleatedToolTip();
    this.translateInProgressToolTip();
    this.translateFailedToolTip();

    this.chartCreation();
  }

  private chartCreation() {
    this.chart = new Chart('user-doughnut-chart', {
      type: 'doughnut',
      data: {
        labels: [ this.compleatedDeals, this.inProgress, this.falledDeals],
        datasets: [
          {
            data: [55, 45, 15],
            backgroundColor: ['#4285F4', '#5DDFA9', '#FF9090'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      },
    });
    const width = this.chart.width;
    const height = this.chart.height;
    const text = '82%';
    const textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2);
    const textY = height / 2;

    this.chart.ctx.fillText(text, textX, textY);
  }

  private translateCompleatedToolTip() {
    this.translate.get('user-pie-chart.compleatedDeals')
      .pipe(first())
      .subscribe(res => {
        this.compleatedDeals = res;
      });
  }

  private translateInProgressToolTip() {
    this.translate.get('user-pie-chart.inProgress')
      .pipe(first())
      .subscribe(res => {
        this.inProgress = res;
      });
  }

  private translateFailedToolTip() {
    this.translate.get('user-pie-chart.compleatedDeals')
      .pipe(first())
      .subscribe(res => {
        this.falledDeals = res;
      });
  }


}
