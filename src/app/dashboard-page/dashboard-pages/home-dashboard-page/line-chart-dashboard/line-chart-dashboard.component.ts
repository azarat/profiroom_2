import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-line-chart-dashboard',
  templateUrl: './line-chart-dashboard.component.html',
  styleUrls: ['./line-chart-dashboard.component.scss']
})
export class LineChartDashboardComponent implements OnInit {

  @Input() user: UserModel;
  @Input() chartLabels: string[];
  @Input() currentFinanceFilter: string;

  public graphWidth = "400";
  public graphHeight = "270";

  public lineChartData: ChartDataSets[] = [{
    // data: [65, 59, 80, 81, 56],
    label: 'Доход',
    lineTension: 0,
    maxBarThickness: 6,
    barThickness: 6,
  }];

  public lineChartOptions: (ChartOptions & {
    annotation: any,
  }) = {
    responsive: false,
    
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        offset: false,
        
        gridLines: {
          color: '#ECEDF4',
          offsetGridLines: false,
        },
        ticks: {
          
          beginAtZero: true,
          callback: function (value) { if (Number.isInteger(value)) { return value; } },
          
      }
      }]
    },
    annotation: {},
    legend: {
      display: false,
    }


    };
  public lineChartColors: Color[] = [{ // grey
    backgroundColor: 'rgba(255,255,255, 0)',
    borderColor: 'rgba(41,204,151,1)',
    borderWidth: 2,
    pointBorderWidth: 2,
    pointBackgroundColor: 'rgba(255,255,255, 1)',
    pointBorderColor: '#29CC97',
    pointHoverBackgroundColor: '#29CC97',
    pointHoverBorderColor: '#29CC97'

  }];

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  public lineChartLabels = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {
     this.getDataForChart();
  }

  private getDataForChart() {
    this.lineChartData[0].data = this.currentFinanceFilter === 'M'? this.user.allDealsperMonths : this.user.allDealsPerYears; 
  }

}
