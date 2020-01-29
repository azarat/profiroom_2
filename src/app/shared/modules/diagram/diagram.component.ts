import { Component, OnInit } from '@angular/core';
import { monthConst } from './consts/month.const';
let moment = require('moment');
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  public maxInput = 5000;
  public stepsCount: number[] = [0, 1, 2, 3, 4, 5];
  public maxStepCount = 6;
  public allMonths: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  yearsCash = [{ value: 2500 }, { value: 5600 }, { value: 2500 }, { value: 350 },
  { value: 2500 }, { value: 11200 }, { value: 7500 }, { value: 2500 }, { value: 2500 }, { value: 4850 }, { value: 4850 }, { value: 4850 }];
  constructor() { }

  ngOnInit() {
    this.getMaxInput(this.yearsCash);

  }



  // getMonthArr() {
  //   const months = [];
  //   const dateStart = moment();
  //   const dateEnd = moment().add(1, 'month');

  //   while (dateEnd.diff(dateStart, 'months') >= 0) {
  //     this.allMonths.push(dateStart.format('M'))
  //     dateStart.add(1, 'month')
  //   }
  //   return this.allMonths;
  // }

  getMaxInput(arr: any[]) {
    arr.forEach(element => {
      if (element.value > this.maxInput) {
        this.maxInput = element.value + 5000;
      }
      // console.log(this.maxInput);
      return this.maxInput;
    });

    if (this.maxInput < 10000) {
      return this.maxInput + 5000;
    } else if (this.maxInput < 20000) {
      return this.maxInput + 10000;
    } else if (this.maxInput < 50000) {
      return this.maxInput + 20000;
    } else if (this.maxInput < 75000) {
      return this.maxInput + 25000;
    } else if (this.maxInput < 100000) {
      return this.maxInput + 50000;
    }
  }

}
