import { Component, OnInit } from '@angular/core';
import { monthConst } from './consts/month.const';
import * as moment from 'moment';
import { DiagramService } from './services/diagram.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  animations: [
    trigger('yearChange', [
    //   // state('zero', style({ height: 0})),
    //   state('curent', style({height: '{{ elHeightValue }}%'}), { params: { height: 0 } }),
    //   transition('void => current', [
    //     animate('0.5s')
    //   ])
    // ])

    transition('* => *', [
    style({height: 0}),
    animate('0.5s'),
  ], { params: { heightValue: '{{ heightValue }}%' }})
  ])]


})
export class DiagramComponent implements OnInit {

  public currentYear = new Date().getFullYear();
  public showedYear;
  public maxInput = 5000;
  public stepsCount: number[] = [0, 1, 2, 3, 4, 5];
  public maxStepCount = 6;
  public allMonths: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  private heightValue = 0;
  public yearsCash: any[];

  constructor(
    private diagramService: DiagramService
  ) { }

  ngOnInit() {
    this.showedYear = this.currentYear;
    this.getStatistic(this.showedYear);
  }

  getMaxInput(arr: any[]) {
    arr.forEach(element => {
      if (+element > this.maxInput) {
        this.maxInput = +element + 5000;
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

  nextYear() {
    if (this.showedYear !== this.currentYear) {
      this.showedYear = this.showedYear + 1;
    }
    this.getStatistic(this.showedYear);
  }
  prevYear() {
    if (this.showedYear !== 2018) {
      this.showedYear = this.showedYear - 1;
    }
    this.getStatistic(this.showedYear);
  }

  private getStatistic(year: number) {
    this.diagramService.getYearStatistic(year)
    .subscribe((res: any) => {
      console.log(res);
      this.yearsCash = res[0].graph;
      this.getMaxInput(this.yearsCash);
    });
  }
}
