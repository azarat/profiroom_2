import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import * as Chart from 'chart.js';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  filter,
  first
} from 'rxjs/operators';
import {
  UserModel
} from 'src/app/models/user.model';

@Component({
  selector: 'app-pie-chart-dashboard',
  templateUrl: './pie-chart-dashboard.component.html',
  styleUrls: ['./pie-chart-dashboard.component.scss']
})
export class PieChartDashboardComponent implements OnInit {

  @Input() user: UserModel;
  private compleatedDeals: string;
  private inProgress: string;
  private falledDeals: string;
  private centerText: string;
  public zeroDeals: boolean = null;
  public dealsAmountInside: string = null;
  public chart: any;

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translateCompleatedToolTip();
    this.translateInProgressToolTip();
    this.translateFailedToolTip();
    this.checkDoesUserHaveDeals();
    this.chartCreation();
    this.putTextInside();
  }

  private chartCreation() {
    this.chart = new Chart('user-doughnut-chart', {
      type: 'doughnut',
      data: {
        labels: [this.compleatedDeals, this.inProgress, this.falledDeals],
        datasets: [{
          data: this.user.pieChart,
          backgroundColor: ['#4285F4', '#5DDFA9', '#FF9090'],
          fill: false
        }, ]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },

      },
    });
  }

  private translateCompleatedToolTip() { // translations of legenf
    this.translate.get('user-pie-chart.compleatedDeals')
      .pipe(first())
      .subscribe(res => {
        this.compleatedDeals = res;
      });
  }

  private translateInProgressToolTip() { // translations of legenf
    this.translate.get('user-pie-chart.inProgress')
      .pipe(first())
      .subscribe(res => {
        this.inProgress = res;
      });
  }

  private translateFailedToolTip() { // translations of legenf
    this.translate.get('user-pie-chart.compleatedDeals')
      .pipe(first())
      .subscribe(res => {
        this.falledDeals = res;
      });
  }

  private checkDoesUserHaveDeals() {
    this.zeroDeals = true;
    let amaunt = 0
    this.user.pieChart.forEach(el => {
      return amaunt += el;
    });
    amaunt === 0 ? this.zeroDeals = true : this.zeroDeals = null
    this.dealsAmountInside = amaunt.toString();
  }

  private putTextInside() {
    Chart.pluginService.register({
      beforeDraw: (chart: any) => {
        const width = this.chart.chart.width;
        const height = this.chart.chart.height;
        const ctx = this.chart.chart.ctx;

        ctx.restore();
        const fontSize = (height / 173).toFixed(2);
        ctx.font = fontSize + 'em Source Sans Pro, sans-serif';
        ctx.textBaseline = 'middle';

        const text = this.dealsAmountInside;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2.2;
        const textNext = 'всего';
        const textXNext = Math.round((width - ctx.measureText(textNext).width) / 2);
        const  textYNext = height / 1.8;

        ctx.fillText(text, textX, textY);
        ctx.fillText(textNext, textXNext, textYNext);
        ctx.save();
      }
    });
  }


}
