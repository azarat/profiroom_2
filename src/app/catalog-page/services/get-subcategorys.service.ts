import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';

@Injectable()
export class GetSubCategoryService {

  // tslint:disable-next-line: variable-name
  private _categoriesList = new BehaviorSubject(null);
  public categoriesList$ = this._categoriesList.asObservable();

  constructor(private http: HttpClient) {}

  getSubCategorys(subcategories: string) {
    console.log('getSubCategorys');
    this.http.get<SubCategoryListInterface >('/subcategories?catedory=' + subcategories)
    .subscribe(res => {
      this._categoriesList.next(res);
      // console.log(this._categoriesList);
    });
  }
}
