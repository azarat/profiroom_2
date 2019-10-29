import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
// import { CategoryListInterface } from '../../shared/interfaces/categories-list.interface';
// import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';
import { FilterInterface } from '../../shared/interfaces/filter.interface';
import { OffersListInterface } from '../../shared/interfaces/offers-list.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class GetOffersService {
  // tslint:disable-next-line: variable-name
  private _subCategory = new BehaviorSubject(null);
  public subCategory$ = this._subCategory.asObservable();

  // tslint:disable-next-line: variable-name
  private _offersList = new BehaviorSubject(null);
  public offersList: Observable<OffersListInterface>;

  // tslint:disable-next-line: variable-name
  private _filterValue: FilterInterface = {};

  private filters = new BehaviorSubject(this._filterValue);
  public filterVaraibles: Observable<FilterInterface>;

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

  // -------- put subcategory value from resolver ----------------//
  public setSubcategoryValue(subcategory: string) {
    // console.log('set.subval');
    this._subCategory.next(subcategory);
    // ??????????
    this.subCategory$.subscribe(res => (this._filterValue.subCategory = res));
  }

  // -------- main functions in catalog ----------------//

  getOffers(link: string | boolean | object) {
    this._offersList.next(null);

    if (link === undefined) {
      this._filterValue = {
        filterBy: '',
        subCategory: ''
      };
    } else if (typeof link === 'string') {
      // this.sortParams(link);
      this.http
        .get('/catalog?' + link)
        .subscribe((res: OffersListInterface) => {
          this._offersList.next(res);
        });
      return;
    }
    // this.filters.next(this._filterValue);

    this.http
      .get('/catalog?subCategory=' + this._filterValue.subCategory)
      .subscribe((res: OffersListInterface) => {
        this._offersList.next(res);
      });
  }

  // tslint:disable-next-line: variable-name
  setFilters(_filters: FilterInterface) {

      this._filterValue = _filters;
      this.filters.next(_filters);

      this.pushFilters(_filters);

  }

  pushFilters(getfilters?: FilterInterface) {
    this._filterValue = getfilters;

    // --------------------delete empty filters -----------------------//
    // Object.keys(this.filters.value).forEach(key => {
    //   if (this.filters.value[key] == null) {
    //     delete this.filters.value[key];
    //   }
    // });

    // tslint:disable-next-line: variable-name
    const _filters = Object.keys(this.filters.value).map(key => key + '=' + this.filters.value[key]).join('&');

    this._router.navigate([this._router.url], {
      relativeTo: this._route,
      queryParams: getfilters,
      queryParamsHandling: 'merge'
    });

    // console.log("getOffers from service - pushFilters()")
    this.getOffers(_filters);
  }
}
