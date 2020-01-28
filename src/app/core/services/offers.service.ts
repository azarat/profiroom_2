import {Injectable} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { FilterInterface } from '../../shared/interfaces/filter.interface';
import { OffersListInterface } from '../../shared/interfaces/offers-list.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class OffersService {

  // tslint:disable-next-line: variable-name
  private _offersList = new BehaviorSubject(null);
  public offersList: Observable<OffersListInterface>;

  // tslint:disable-next-line: variable-name
  private _filterValue: FilterInterface = {
    filterBy: ' '
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

  getOffers(link: string | boolean | object) {
    this._offersList.next(null);
    if (link === undefined) {
      this._filterValue = {
        filterBy: ' ',
        subCategory: 'InterfaceDesign'
      };
    }
    this.filters.next(this._filterValue);
    return this.http.post('/catalog', this._filterValue).subscribe(
      (res: OffersListInterface) => {
        this._offersList.next(res);
      });
  }
}
