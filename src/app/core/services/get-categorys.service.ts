import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CategoryListInterface } from '../../shared/interfaces/categories-list.interface';
import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';

@Injectable()
export class CategorysListService {

  // tslint:disable-next-line: variable-name
  private _categoriesList = new BehaviorSubject(null);
  public categoriesList$ = this._categoriesList.asObservable();

  constructor(private http: HttpClient) {}

  getCategorys() {
    return this.http.get<CategoryListInterface >('/categories');
  }

  getSubCategorys(subcategories: string) {
    this.http.get<SubCategoryListInterface >('/subcategories?catedory=' + subcategories)
    .subscribe(res => {
      this._categoriesList.next(res);
    });
  }

  // sharedCatList(dataList: CategorysList) {
  //   this.categorysList.next(dataList);
  // }

}

