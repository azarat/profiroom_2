import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart-dashboard',
  templateUrl: './pie-chart-dashboard.component.html',
  styleUrls: ['./pie-chart-dashboard.component.scss']
})
export class PieChartDashboardComponent implements OnInit {

  public pieChartType = 'pie';
  public data = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
