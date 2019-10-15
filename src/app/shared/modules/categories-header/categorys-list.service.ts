import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface CategorysList {
  category?: [];
  id?: number;
  name?: string;
  descroption?: string;
}

@Injectable({providedIn: 'root'})
export class CategorysListService {

  categorysList: CategorysList = null;

  constructor(private http: HttpClient) { }

  getCategorys() {
    return this.http.get<CategorysList>('/categories');
  }

}

