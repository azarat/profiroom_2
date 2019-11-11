import { Component, EventEmitter, Input, OnInit, Output, ɵConsole } from '@angular/core';
import { FilterInterface } from 'src/app/shared/interfaces/filter.interface';

import { GetOffersService } from '../../services/get-offers.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss']
})
export class FilterComponent implements OnInit {
  [x: string]: any;

  public fliterOpen = false;
  // tslint:disable-next-line: variable-name
  public filterData: FilterInterface = {};
  public subcategory;

  // private filters = new BehaviorSubject(this._filterData);
  // public filterVaraibles: Observable<FilterInterface>;

  constructor(
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute
  ) {
    this._getOffersService.subCategory$.subscribe(data => {
      this.subcategory = data;
      this.filterData.subCategory = this.subcategory;
    });
    this._route.queryParams.subscribe(p => {
      // console.log(p);
      this.filterData.minPrice = p.minPrice;
      this.filterData.maxPrice = p.maxPrice;
      this.filterData.maxTerm = p.maxTerm;
    });
  }

  ngOnInit() {
    this._getOffersService.setFilters(this.filterData);
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
