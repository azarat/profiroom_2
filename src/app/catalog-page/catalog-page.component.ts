import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export interface FreelancersList {
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

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  freelancerList: FreelancersList;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<FreelancersList>( 'https://www.thecubetest.site/Backend/api/catalog')
      .subscribe(freelancerList => {
        console.log('freelancerList', freelancerList.gigs);
        this.freelancerList = freelancerList;
      });
  }

}
