import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  private _filterValue: FilterInterface = {};   // All value filters that will transferred in url


  private filters = new BehaviorSubject(this._filterValue);
  public filterVaraibles: Observable<FilterInterface>;

  constructor(
    private http: HttpClient,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
  ) {
    this.offersList = this._offersList.asObservable();
    this.filterVaraibles = this.filters.asObservable();
  }

  // -------- put subcategory value from resolver ----------------//
  public setSubcategoryValue(subcategory: string ) {
    console.log('set.subval');
    this._subCategory.next(subcategory);
    this.subCategory$.subscribe(
      res => this._filterValue.subCategory = res
    );

  }

    // getOffers(offersList: string) {
  //   this.http.post<OffersList>('/categories', offersList)
  //   .subscribe(res => {
  //     this._offersList.next(res);
  //     console.log(this._offersList);
  //   });
  // }

  getOffers(link: string | boolean | object) {
    console.log(this._filterValue);
    this._offersList.next(null);
    // console.log(this.currentFilters);

    if (link === undefined) {
      this._filterValue = {
        filterBy: '',
        subCategory: '',

      };
    }

    // else if (typeof link === 'string') {
    //   this.sortParams(link);
    // }
    // this.filters.next(this._filterValue);

    this.http.post('/catalog?category=' + this._filterValue.subCategory, this._filterValue).subscribe(
      (res: OffersListInterface) => {
        this._offersList.next(res);
      });
  }
}
