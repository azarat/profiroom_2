import { Component, EventEmitter, Input, OnInit, Output, ɵConsole } from '@angular/core';
import { FilterInterface } from 'src/app/shared/interfaces/filter.interface';
import { CatalogFilterModel } from 'src/app/models/filter.model';

import { GetOffersService } from '../../services/get-offers.service';
import { ActivatedRoute } from '@angular/router';
import {MDCSelect} from '@material/select';


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
  // public subcategory;

  constructor(
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute
  ) {
    this._getOffersService.subCategory$.subscribe(data => {
      // this.subcategory = data;

      this.filterData.subCategory = data;
      console.log(data);
    });



    // this._route.params.subscribe(p => {
    //   // console.log(this.filterData);
    //   this.filterData = p;
    //   // console.log(this.filterData);
    // });
  }

  ngOnInit() { }

  onFilterChange() {
    this._getOffersService.setFilters(this.filterData);
  }

  clearTerms() {
    this.filterData.maxTerm = null;
    this._getOffersService.setFilters(this.filterData);
  }
  clearTypes() {
    this.filterData.PSD = null;
    this.filterData.PNG = null;
    this._getOffersService.setFilters(this.filterData);
  }
  clearIncludes() {
    this.filterData.commercial = null;
    this.filterData.confidentiality = null;
    this.filterData.agreement = null;
    this._getOffersService.setFilters(this.filterData);
  }
  showFullFilter(x) {
    if(this.fliterOpen === x) {
      this.fliterOpen = null;
    } else {
      this.fliterOpen = x;
    }
  }








}
