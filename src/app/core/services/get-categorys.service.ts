import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface CategorysList {
  category?: [];
  id?: number;
  name?: string;
  descroption?: string;
}

@Injectable({providedIn: 'root'})
export class CategorysListService {

  // categorysList: CategorysList = null;

  // private categorysList = new BehaviorSubject(null);
  // public categorysList$: Observable<CategorysList>;

  constructor(private http: HttpClient) {
    // this.categorysList$ = this.categorysList.asObservable();
  }

  getCategorys() {
    return this.http.get<CategorysList>('/categories');
  }

}

