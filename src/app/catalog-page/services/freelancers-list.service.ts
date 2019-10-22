import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface FreelancersList {
  getSubcategoryFreelancers: any;
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
  data: [];
}

@Injectable({providedIn: 'root'})

export class FreelancersListService {

  constructor(private http: HttpClient) {}

  // getCategoriesList(subcategorie: string): Observable<FreelancersList[]> {
  //   return this.http.get<FreelancersList[]>('/catalogium?category=' + subcategorie );
  // }

  // getSubcategoryFreelancers(freelancerList: FreelancersList): Observable<FreelancersList> {
  //   return this.http.post<FreelancersList>('/categories', freelancerList);
  // }
}
