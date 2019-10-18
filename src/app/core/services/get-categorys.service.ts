import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface CategorysListInterface {
  category?: [];
  id?: number;
  name?: string;
  descroption?: string;
}

export interface SubCategorysListInterface {
  category?: [];
  id?: number;
  name?: string;
  descroption?: string;
}

@Injectable()
export class CategorysListService {


  // tslint:disable-next-line: variable-name
  private _categoriesList = new BehaviorSubject(null);
  public categoriesList$ = this._categoriesList.asObservable();

  constructor(private http: HttpClient) {}

  getCategorys() {
    return this.http.get<CategorysListInterface >('/categories');
  }

  getSubCategorys(subcategories: string) {
    this.http.get<CategorysListInterface >('/subcategories?catedory=' + subcategories)
    .subscribe(res => {
      this._categoriesList.next(res);
    });
  }

  // sharedCatList(dataList: CategorysList) {
  //   this.categorysList.next(dataList);
  // }

}

