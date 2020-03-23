import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-mounth-chart-select',
  templateUrl: './mounth-chart-select.component.html',
  styleUrls: ['./mounth-chart-select.component.scss']
})
export class MounthChartSelectComponent implements OnInit {

  public currentData: {
    month: number;
    year: number
  };

  public minYear = 2017;
  private curentYear = new Date().getFullYear();

  @Output() currentDateEmitting = new EventEmitter();

  constructor() {
    this.getCurrentData();
  }

  ngOnInit() {
  }

  private getCurrentData() {
    this.currentData = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    };
  }

  public nextYear() {
    this.currentData.year = this.currentData.year === this.curentYear ? this.curentYear : this.currentData.year + 1;
    this.emitCurrentDate(this.currentData);
  }

  public prevYear() {
    this.currentData.year = this.currentData.year === this.minYear ? this.minYear : this.currentData.year - 1;
    this.emitCurrentDate(this.currentData);
  }

  public nextMonth() {
    this.currentData.month = this.currentData.month === 12 ? this.currentData.month = 1 : this.currentData.month + 1;
    this.emitCurrentDate(this.currentData);
  }

  public prevMonth() {
    this.currentData.month = this.currentData.month === 1 ? this.currentData.month = 12 : this.currentData.month - 1;
    this.emitCurrentDate(this.currentData);
  }

  private emitCurrentDate(date) {
    this.currentDateEmitting.emit(date);
  }

}
