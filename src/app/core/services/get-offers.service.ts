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
  private _offersList = new BehaviorSubject(null);
  public offersList: Observable<OffersListInterface>;

  // tslint:disable-next-line: variable-name
  private _filterValue: FilterInterface = {
    filterBy: ' ',
    subCategory: '1C'
  };

  private filters = new BehaviorSubject(this._filterValue);
  public filterVaraibles: Observable<FilterInterface>;

  constructor(
    private http: HttpClient,
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
  ) {
    this.offersList = this._offersList.asObservable();
  }

    // getOffers(offersList: string) {
  //   this.http.post<OffersList>('/categories', offersList)
  //   .subscribe(res => {
  //     this._offersList.next(res);
  //     console.log(this._offersList);
  //   });
  // }


  getOffers(link: string | boolean | object) {
    this._offersList.next(null);
    if (link === undefined) {
      this._filterValue = {
        filterBy: ' ',
        subCategory: '1C'
      };
    }
    // else if (typeof link === 'string') {
    //   this.sortParams(link);
    // }
    this.filters.next(this._filterValue);
    console.log(this._filterValue);
    this.http.post('catalog?category=' + this._filterValue.subCategory , this._filterValue).subscribe(
      (res: OffersListInterface) => {
        this._offersList.next(res);
        console.log(this._offersList);
      });
  }
}
