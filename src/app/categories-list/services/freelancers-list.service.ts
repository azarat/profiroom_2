import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface FreelancersList {
  getCategoryData: any;
  avaible_gigs?: number;
  gigs?: [];
  descroption?: string;
  comments_count?: number;
  rating?: number;
  min_price?: number;
  liked?: boolean;
  level?: string;
  name?: string;
  surname?: string;
  ava?: string;
}

@Injectable({providedIn: 'root'})

export class FreelancersListService {
  constructor(private http: HttpClient) {}

  getList(): Observable<FreelancersList> {
    return this.http.get<FreelancersList>('https://www.thecubetest.site/Backend/api/catalog');
  }

  getCategoryData(category: string): Observable<FreelancersList> {
    console.log('category+123', category);
    return this.http.post<FreelancersList>('https://www.thecubetest.site/Backend/api/categories', category);
    // .subscribe(x => {
    //   console.log(x);
    // });
  }
}
