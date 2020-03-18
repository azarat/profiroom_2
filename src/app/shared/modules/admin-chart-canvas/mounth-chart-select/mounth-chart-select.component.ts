import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-mounth-chart-select',
  templateUrl: './mounth-chart-select.component.html',
  styleUrls: ['./mounth-chart-select.component.scss']
})
export class MounthChartSelectComponent implements OnInit {

  currentData: {
    month: number;
    year: number
  } = {
    month: 12,
    year: 2019
  }

  constructor() {}

  ngOnInit() {}

}
