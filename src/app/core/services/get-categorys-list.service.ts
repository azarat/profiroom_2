import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CategoryListInterface } from '../../shared/interfaces/categories-list.interface';
import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';
import { OffersListInterface } from '../../shared/interfaces/offers-list.interface';

@Injectable()
export class CategorysListService {

  // tslint:disable-next-line: variable-name
  private _categoriesList = new BehaviorSubject(null);
  public categoriesList$ = this._categoriesList.asObservable();

  constructor(private http: HttpClient) {}

  getCategorys() {
    // console.log('getCategorys');
    return this.http.get<CategoryListInterface >('/categories');
  }

  // getSubCategorys(subcategories: string) {
  //   // console.log('getSubCategorys');
  //   this.http.get<SubCategoryListInterface >('/subcategories?catedory=' + subcategories)
  //   .subscribe(res => {
  //     console.log(res)
  //     this._categoriesList.next(res);
  //     // console.log(this._categoriesList);
  //   });
  // }


}

