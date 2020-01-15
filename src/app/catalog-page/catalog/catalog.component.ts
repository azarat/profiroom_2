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

  public offersList: OffersListInterface;

  // catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private getOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private router: Router
  ) {
    // --------------check url params value---------------
    this._route.params.subscribe(Params => {
      this.catalogFilters = plainToClass(CatalogFiltersModel, Params);
      this.getOffersService.getOffers(this.catalogFilters);
      // console.log(this.catalogFilters);
      // ------- value of category for breadcrumbs
      this.category = Params.category;
    });

    // --------------check queryParams value---------------
    this._route.queryParams.subscribe(qParams => {
      // console.log(qParams);
      if (qParams && (Object.keys(qParams).length === 0)) {
        console.log('queryParams is empty');
        this.catalogFilters.page = 1;
        // this.catalogFilters.current_page = 1;
        // console.log(this.catalogFilters);
      } else {
        // console.log('from query params');
        this.getOffersService.getOffers(qParams);


      }
    });
  }

  ngOnInit() {

    this.getOffersService.offersList.subscribe(data => {
      this.offersList = data;
      // console.log(this.offersList);
      // console.log(this.catalogFilters);
      // if (this.offersList) {
      //   this.pagesToShow();
      // }
    });

  }




}
