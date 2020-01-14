import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';
import { FilterTypesModel } from 'src/app/models/catalog-filter/types.model';
import { GetOffersService } from '../../services/get-offers.service';

@Component({
  selector: 'app-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss']
})
export class FilterComponent implements OnInit {

  public fliterOpen = null;

  @Input() catalogFilters: CatalogFiltersModel;
  @Input() filterTypes: FilterTypesModel;

  constructor(
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
  ) {}

  ngOnInit() {}

  onFilterChange() {
    console.log(this.catalogFilters);
    this._getOffersService.setFilters(this.catalogFilters);
  }

  clearTerms() {
    this.catalogFilters.maxTerm = null;
    this._getOffersService.setFilters(this.catalogFilters);
  }
  clearTypes() {
    this.filterTypes.PSD = null;
    this.filterTypes.PNG = null;
    this._getOffersService.setFilters(this.catalogFilters);
  }
  clearIncludes() {
  //   this.catalogFilters.filterIncludesModel.commercial = null;
  //   this.catalogFilters.filterIncludesModel.confidentiality = null;
  //   this.catalogFilters.filterIncludesModel.agreement = null;
  //   this._getOffersService.setFilters(this.catalogFilters);
  }
  showFullFilter(x) {
    if (this.fliterOpen === x) {
      this.fliterOpen = null;
    } else {
      this.fliterOpen = x;
    }
  }
}
