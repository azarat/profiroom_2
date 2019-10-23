import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterInterface } from 'src/app/shared/interfaces/filter.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filterData: FilterInterface = {};

  constructor() { }

  ngOnInit() {
  }

  onFilterChange(){ };

}
