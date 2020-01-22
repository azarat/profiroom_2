import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';

import { GetOffersService } from '../../services/get-offers.service';

@Component({
  selector: 'app-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss']
})
export class FilterComponent implements OnInit {

  public fliterOpen = null;

  @Input() catalogFilters: CatalogFiltersModel;


  constructor(
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
  ) {}

  ngOnInit() {
    console.log(this.catalogFilters);
  }


  onFilterChange() {
    console.log(this.catalogFilters);
    this._getOffersService.setFilters(this.catalogFilters);
  }

  clearTerms() {
    this.catalogFilters.maxTerm = null;
    this._getOffersService.setFilters(this.catalogFilters);
  }
  clearTypes() {
    this.catalogFilters.PSD = null;
    this.catalogFilters.PNG = null;
    this._getOffersService.setFilters(this.catalogFilters);
  }
  clearIncludes() {
    this.catalogFilters.commercial = null;
    this.catalogFilters.confidentiality = null;
    this.catalogFilters.agreement = null;
    this._getOffersService.setFilters(this.catalogFilters);
  }
  showFullFilter(x) {
    if (this.fliterOpen === x) {
      this.fliterOpen = null;
    } else {
      this.fliterOpen = x;
    }
  }
}
