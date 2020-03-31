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
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private router: Router
  ) {
    // --------------check url params value---------------
    this._route.params.subscribe(Params => {
      console.log("Params", Object.keys(Params).length );
      this.catalogFilters = plainToClass(CatalogFiltersModel, Params);
      this.catalogFilters.subCategory = Params.subCategory;
      if(Object.keys(Params).length <= 2) {
        this.GetOffersService.getOffers(this.catalogFilters);
      } else{




      }
      
      // ------- value of category for breadcrumbs
      this.category = Params.category;
    });

    // --------------check queryParams value---------------
    this._route.queryParams.subscribe(qParams => {
      console.log("qParams", qParams);
      if (qParams && (Object.keys(qParams).length === 0)) {
        this.catalogFilters.current_page = 1;
        this.GetOffersService.setFilters(this.catalogFilters);
        this.GetOffersService.getOffers(this.catalogFilters);
      } else {
        this.GetOffersService.getOffers(qParams);

      }
    });
  }

  ngOnInit() {

    this.GetOffersService.offersList.subscribe(data => {
      this.offersList = data;
      if (this.offersList) {
        this.pagesToShow();
      }
    });

    this.href = this.router.url;
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
  }

}

