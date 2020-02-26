import { Component, OnInit } from '@angular/core';
import { DiagramService } from './services/diagram.service';
import { chartGrowAnimation } from './animations/chart-grow.animation';


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  animations: [
    chartGrowAnimation
  ]


})
export class DiagramComponent implements OnInit {

  public currentYear = new Date().getFullYear();
  public showedYear;
  public maxInput = 5000;
  public stepsCount: number[] = [0, 1, 2, 3, 4, 5];
  public maxStepCount = 6;
  public allMonths: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  public heightValue;
  public yearsCash: { up: number, down: number }[];

  constructor(
    private diagramService: DiagramService
  ) { }

  ngOnInit() {
    this.showedYear = this.currentYear;
    this.getStatistic(this.showedYear);
  }

  getMaxInput(arr: any[]) {
    arr.forEach(element => {
      return this.maxInput = Math.max(element.up, element.down, this.maxInput);
    });

    if (this.maxInput >= 100000) {
      return this.maxInput = this.maxInput + 50000;
    } else if (this.maxInput >= 75000) {
      return this.maxInput = this.maxInput + 25000;
    } else if (this.maxInput >= 50000) {
      return this.maxInput = this.maxInput + 20000;
    } else if (this.maxInput >= 20000) {
      return this.maxInput = this.maxInput + 10000;
    } else {
      return this.maxInput = this.maxInput + 5000;
    }

  }

  nextYear() {
    this.maxInput = 0;
    if (this.showedYear !== this.currentYear) {
      this.showedYear = this.showedYear + 1;
    }
    this.getStatistic(this.showedYear);
  }
  prevYear() {
    this.maxInput = 0;
    if (this.showedYear !== 2018) {
      this.showedYear = this.showedYear - 1;
    }
    this.getStatistic(this.showedYear);
  }

  private getStatistic(year: number) {
    this.yearsCash = null;
    this.heightValue = 'in';
    this.diagramService.getYearStatistic(year)
      .subscribe((res: any) => {
        console.log(res);
        this.yearsCash = res[0].graph;
        this.getMaxInput(this.yearsCash);
        this.heightValue = 'out';
        console.log(this.maxInput);
      });
  }
}
