import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Color,
  BaseChartDirective,
  Label
} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {
  ChartDataSets,
  ChartOptions
} from 'chart.js';
import {
  monthArrayConvert
} from '../../functions/month-array-convert.function';
import {
  monthArrConst
} from './consts/monts-arr.const';
import {
  weekendArrConst
} from './consts/weekend-arr.const';
import {
  CanvasXbarService
} from './services/canvas-x-bar.service';

@Component({
  selector: 'app-admin-chart-canvas',
  templateUrl: './admin-chart-canvas.component.html',
  styleUrls: ['./admin-chart-canvas.component.scss']
})
export class AdminChartCanvasComponent implements OnInit {

  public listOpen: boolean = null;
  public monthSelectOpen: boolean = null;
  chartTypes = [{
      name: 'Год',
      value: 'year'
    },
    {
      name: 'Месяц',
      value: 'month'
    },
    {
      name: 'День',
      value: 'day'
    }
  ];

  public curerntType: {
    name: string,
    value: string
  } = {
    name: 'Год',
    value: 'year'
  }

  public lineChartData: ChartDataSets[] = [{
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Доход',
      lineTension: 0,
      maxBarThickness: 6,
      barThickness: 6,
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: '',
      lineTension: 0,
      maxBarThickness: 6,
      barThickness: 6,
    },
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];

  private yearBar = weekendArrConst;

  public lineChartLabels: Label[];

  public lineChartOptions: (ChartOptions & {
    annotation: any
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

    },
    { // dark grey
      backgroundColor: 'rgba(255,255,255, 0)',
      borderColor: '#3C7EEA',
      borderWidth: 2,
      pointBorderWidth: 2,
      pointBackgroundColor: 'rgba(255,255,255, 1)',
      pointBorderColor: '#3C7EEA',
      pointHoverBackgroundColor: '#3C7EEA',
      pointHoverBorderColor: '#3C7EEA'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {
    static: true
  }) chart: BaseChartDirective;
  // year
  public currentYear = new Date().getFullYear();
  public showedDate;

  constructor(
    private canvasXbarService: CanvasXbarService
  ) {}

  ngOnInit() {
    this.selectChartType(this.curerntType);
    this.showedDate = this.currentYear;
  }


  private setDayChartBar() {
    this.yearBar = this.canvasXbarService.getHoursCount();
    this.lineChartLabels = this.yearBar;
  }

private _selectXtarXBar() {
  if (this.curerntType.value === 'year') {
    this.lineChartLabels = monthArrConst;
  } else if (this.curerntType.value === 'month') {
    // this.yearBar = this.canvasXbarService.getMontDaysCount();
    this.lineChartLabels = this.yearBar;
  } else {
    this.setDayChartBar()
  }
}
  public selectChartType(type) {
    this.curerntType = type;
    this._selectXtarXBar();
    this.listOpen = false;
  }

  openTypesList() {
    if (!this.listOpen) {
      this.listOpen = true;
    } else {
      this.listOpen = !this.listOpen;
    }
  }


  // year chart

  nextYear() {
    if (this.showedDate !== this.currentYear) {
      this.showedDate = this.showedDate + 1;
    }
  }
  prevYear() {
    if (this.showedDate !== 2018) {
      this.showedDate = this.showedDate - 1;
    }
  }

  public toggleMonthSelect() {
    this.monthSelectOpen = this.monthSelectOpen?  null : true;
  }
}
