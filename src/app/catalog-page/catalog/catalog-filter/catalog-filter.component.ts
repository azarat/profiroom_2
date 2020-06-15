import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';

import { GetOffersService } from '../../services/get-offers.service';

@Component({
  selector: 'app-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss']
})
export class FilterComponent implements OnInit {

  // private catalogFilters: CatalogFiltersModel
  public fliterOpen = null;
  public showMobilesFilters = false;
  public filterTranslations = {
    online: 'Онлайн',
    PSD: 'PSD',
    PNG: 'PNG',
    commercial: 'Коммерческое использование',
    confidentiality: 'Конфиденциальность',
    agreement: 'Контракты и соглашения',
    LangUkr: 'Украинский',
    LangRus: 'Русский',
    LangBr: 'Беларусский',
  };

  @Input() catalogFilters: CatalogFiltersModel;
  // public catalogFilters: CatalogFiltersModel;

  constructor(
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
  ) {}

  ngOnInit() {
  }


  onFilterChange() {

    setTimeout(() => {
      if(Number(this.catalogFilters.minPrice) > Number(this.catalogFilters.maxPrice)) {
        this.catalogFilters.maxPrice = null;
      }
      this._getOffersService.setFilters(this.catalogFilters);
    }, 2000);
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
  clearFilter(y, x) {
    Object.keys(this.catalogFilters).forEach(key => {
      if (key === y) {
        if (typeof x === 'boolean') {
          this.catalogFilters[key] = false;
        } else {
          this.catalogFilters[key] = '';
        }
      }
    });
    this._getOffersService.setFilters(this.catalogFilters);
  }

  public toggleMobFilters() {
    this.showMobilesFilters = !this.showMobilesFilters;
  }
}
