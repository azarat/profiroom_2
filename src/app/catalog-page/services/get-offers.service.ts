import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';

import { OffersListInterface } from '../../shared/interfaces/offers-list.interface';
import { ActivatedRoute, Router } from '@angular/router';
// import { queryPaginated, Page } from '../catalog/catalog.component';

@Injectable()
export class GetOffersService {

  // tslint:disable-next-line: variable-name
  private _offersList = new BehaviorSubject(null);
  public offersList: Observable<OffersListInterface>;

  // tslint:disable-next-line: variable-name
  private _filterValue: CatalogFiltersModel;

  private filters = new BehaviorSubject(this._filterValue);
  public filterVaraibles: Observable<CatalogFiltersModel>;

  constructor(
    private http: HttpClient,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router // tslint:disable-next-line: variable-name
  ) {
    this.offersList = this._offersList.asObservable();
    this.filterVaraibles = this.filters.asObservable();
  }

  // -------- main functions in catalog ----------------//

  getOffers(filters: CatalogFiltersModel | any) {
    this._offersList.next(null);

    if(typeof (filters.online) === 'string'){
      console.log('string');
      console.log(filters.online);
      filters.online = false;

      if(filters.online === "true"){
        filters.online = true;
      }
    }    

    this.http.post('/catalog', filters).subscribe((res: CatalogFiltersModel) => {
      this._offersList.next(res);
    });
  }

  // tslint:disable-next-line: variable-name
  setFilters(PARAMSfilter: CatalogFiltersModel) {
    this._filterValue = PARAMSfilter;
    this.filters.next(PARAMSfilter);


    // if(typeof (PARAMSfilter.online) === 'string'){
    //   console.log('string');
    //   console.log(PARAMSfilter.online);
    //   if(PARAMSfilter.online === "true"){
    //     PARAMSfilter.online = true;
    //   } else {
    //     PARAMSfilter.online = false;
    //   }
    // PARAMSfilter.online = (PARAMSfilter.online === "true") ? true: false;

    this.pushFilters(PARAMSfilter);
  }

  pushFilters(getfilters?: CatalogFiltersModel) {

    // // --------------------delete empty filters -----------------------//
    // Object.keys(this.filters.value).forEach(key => {
    //   if (this.filters.value[key] == null) {
    //     delete this.filters.value[key];
    //   }
    // });

    this._router.navigate([this._router.url.split('%' && '?')[0]], {
      relativeTo: this._route,
      queryParams: getfilters,
      queryParamsHandling: 'merge'
    });
  }
}
