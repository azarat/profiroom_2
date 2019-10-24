import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';

@Injectable()
export class GetCategorieItemsService {

  // tslint:disable-next-line: variable-name
  private _categoriesList = new BehaviorSubject(null);
  public categoriesList$ = this._categoriesList.asObservable();

  constructor(private http: HttpClient) {}

  getCategorieItems(subcategories: string) {
    this.http.get<SubCategoryListInterface >('/subcategories?catedory=' + subcategories)
    .subscribe((res: SubCategoryListInterface) => {
      this._categoriesList.next(res.category[0]);
    });
  }
}
