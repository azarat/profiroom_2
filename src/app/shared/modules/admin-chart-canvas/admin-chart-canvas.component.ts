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
import * as moment from 'moment';
import {
  ChartDataService
} from './services/chart-data.service';

@Component({
  selector: 'app-admin-chart-canvas',
  templateUrl: './admin-chart-canvas.component.html',
  styleUrls: ['./admin-chart-canvas.component.scss']
})
export class AdminChartCanvasComponent implements OnInit {

  public listOpen: boolean = null;
  public monthSelectOpen: boolean = null;
  public chartTypes = [{
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
  };

  maxView = 'year';
  minView = 'day';
  selectedDate: Date;
  showCalendar = true;
  startView = 'day';
  views = ['day', 'month', 'year'];
  monthShort = ['янв', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  optionsCalendar = moment.lang('ru');

  public lineChartData: ChartDataSets[] = [{
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Доход',
      lineTension: 0,
      maxBarThickness: 6,
      barThickness: 6,
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Расход',
      lineTension: 0,
      maxBarThickness: 6,
      barThickness: 6,
    },
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];

  private weekendBar = weekendArrConst;

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
  private currentData: {
    month: number,
    year: number,
    day: number
  } = {
    month: null,
    day: null,
    year: this.currentYear
  };

  constructor(
    private canvasXbarService: CanvasXbarService,
    private chartDataService: ChartDataService
  ) {}

  ngOnInit() {
    this.selectChartType(this.curerntType);
    this.showedDate = this.currentYear;
    this.getChartsData(this.currentData);
  }

  //  getting Data for Chart

  private getChartsData(date: any) {
    this.chartDataService.getAllFinances(date)
      .subscribe((res: {
        periodIncome: number[],
        outcome: number[]
      }) => {
        this.lineChartData[0].data = res.periodIncome;
        this.lineChartData[1].data = res.outcome;
        console.log(res);
      });
  }
  //  select menu function
  public selectChartType(type) {
    this.curerntType = type; // set current filters type
    this._selectXtarXBar();
    this.listOpen = false; // hide menu
  }

  private _selectXtarXBar() {
    const year = new Date().getFullYear(); // get current year
    const month = new Date().getMonth() + 1; // geet current month
    this.restDateFunction(this.curerntType.value); // reset data

    if (this.curerntType.value === 'year') {

      this.lineChartLabels = monthArrConst; // create month points
      this.getChartsData(this.currentData);

    } else if (this.curerntType.value === 'month') {

      this.lineChartLabels = this.canvasXbarService.getMontDaysCount(month, year); // create points of days
      this.currentData.month = month;
      this.getChartsData(this.currentData);

    } else if (this.curerntType.value === 'day') {

      this.setDayChartBar();
      this.currentData.month = month; // get current month
      this.currentData.day = new Date().getDate(); // get current day
      this.getChartsData(this.currentData); // get data

    }
  }

  private restDateFunction(type) {
    if (type === 'year') {
      this.currentData.month = null; // clear to get only year
      this.currentData.day = null; // clear to get only year
    } else if ((type === 'month')) {
      this.currentData.day = null; // clear to get only month
    }
  }

  private setDayChartBar() {
    // this.weekendBar = this.canvasXbarService.getHoursCount();
    this.lineChartLabels = this.canvasXbarService.getHoursCount();
  }



  openTypesList() {  // select menu
    if (!this.listOpen) {
      this.listOpen = true;
    } else {
      this.listOpen = !this.listOpen;
    }
  }


  // year chart

  // nextYear() {
  //   if (this.showedDate !== this.currentYear) {
  //     this.showedDate = this.showedDate + 1;
  //   }
  //   this.currentData.year = this.showedDate;
  // }
  // prevYear() {
  //   if (this.showedDate !== 2018) {
  //     this.showedDate = this.showedDate - 1;
  //   }
  //   this.currentData.year = this.showedDate;
  // }

  public changeYear(move: string) {
    if (move === 'next') {
      this.currentData.year = this.showedDate !== this.currentYear ? this.showedDate += 1 : this.showedDate;
    } else if (move === 'prev') {
      this.currentData.year = this.showedDate !== 2018 ? this.showedDate -= 1 : this.showedDate;
    }
    this.getChartsData(this.currentData);
  }
  // this.getChartsData(this.currentData);

  public toggleMonthSelect() {
    this.monthSelectOpen = this.monthSelectOpen ? null : true;
  }


  public currentDateEmitting(date) {
    this.lineChartLabels = this.canvasXbarService.getMontDaysCount(date.month, date.year);
    this.currentData.month = date.month; // get current month
    this.currentData.year = date.year; // get current day
    this.getChartsData(this.currentData);
  }

  public onCustomDateChange(el: Date) {
    if (el) {
      this.currentData.year = el.getFullYear();
      this.currentData.month = (el.getMonth()) + 1;
      this.currentData.day = el.getDate();
      console.log(this.currentData);
      this.getChartsData(this.currentData);
    }
  }

}
