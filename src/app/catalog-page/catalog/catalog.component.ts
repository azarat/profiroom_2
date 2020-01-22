import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';

import { GetOffersService } from '../services/get-offers.service';
import { Subscription, pipe, Observable } from 'rxjs';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';
import { plainToClass } from 'class-transformer';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public catalogFilters: CatalogFiltersModel;
  public category;
  public href;

  public currentQueryParams;
  public pagesArr = [];

  offersList: OffersListInterface;

  catalogSubscription: Subscription;

  constructor(
    public _getOffersService: GetOffersService,
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private router: Router
  ) {
    // --------------check url params value---------------
    this._route.params.subscribe(Params => {
      this.catalogFilters = plainToClass(CatalogFiltersModel, Params);
      // console.log('catalog filters', this.catalogFilters);
      // this.catalogFilters.subCategory = Params.subCategory;
      this.GetOffersService.getOffers(this.catalogFilters);
      // ------- value of category for breadcrumbs
      this.category = Params.category;
      // console.log(this.category);
    });

    // --------------check queryParams value---------------
    this._route.queryParams.subscribe(qParams => {
      if (qParams && (Object.keys(qParams).length === 0)) {
        // console.log('queryParams is empty');
        this.catalogFilters.current_page = 1;
      } else {
        // console.log('from query params');
        this.GetOffersService.getOffers(qParams);


      }
    });
    // console.log(this.offersList);
  }

  ngOnInit() {

    this.GetOffersService.offersList.subscribe(data => {
      this.offersList = data;
      // console.log(this.offersList);

      if (this.offersList) {
        this.pagesToShow();
      }
    });

    this.href = this.router.url;

    // console.log(this.href);


  }

  pagesToShow() {
    this.pagesArr = [];

    // currentPage
    const a = 5;
    // pagesToShow
    const b = a + 2;

    for (let i = a - 1; i < b; i++ ) {
      this.pagesArr.push(i);
    }
    // console.log(this.pagesArr);
  }







}



// export class Page<T> {
//   count: number;      // total number of items
//   next: string;       // URL of the next page
//   previous: string;   // URL of the previous page
//   results: Array<T>;  // items for the current page
// }

// export function queryPaginated<T>(http: HttpClient, baseUrl: string, urlOrFilter?: string | object): Observable<Page<T>> {
//   let params = new HttpParams();
//   let url = baseUrl;

//   console.log("http ", http);
//   console.log("baseUrl ", baseUrl);
//   console.log("urlOrFilter ", urlOrFilter);

//   if (typeof urlOrFilter === 'string') {
//     // we were given a page URL, use it
//     url = urlOrFilter;
//   } else if (typeof urlOrFilter === 'object') {
//     // we were given filtering criteria, build the query string
//     Object.keys(urlOrFilter).sort().forEach(key => {
//       const value = urlOrFilter[key];
//       if (value !== null) {
//         params = params.set(key, value.toString());
//       }
//     });
//   }

//   return http.get<Page<T>>(url, {
//     params: params
//   });
// }
