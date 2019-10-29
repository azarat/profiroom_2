import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterInterface } from 'src/app/shared/interfaces/filter.interface';

import { GetOffersService } from '../../services/get-offers.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public fliterOpen = false;
  // tslint:disable-next-line: variable-name
  public filterData: FilterInterface = {};
  public subcategory;

  // private filters = new BehaviorSubject(this._filterData);
  // public filterVaraibles: Observable<FilterInterface>;

  constructor(
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
  ) {
    this._getOffersService.subCategory$.subscribe(data => {
      this.subcategory = data;
      this.filterData.subCategory = this.subcategory;
    });
  }

  ngOnInit() {

  }

  onFilterChange() {
    this._getOffersService.setFilters(this.filterData);
  }

  showFullFilter() {
    if (this.fliterOpen === null) {
      this.fliterOpen = true;
    } else {
      this.fliterOpen = !this.fliterOpen;
    }

  }

}
