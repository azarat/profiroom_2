import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogFiltersModel } from 'src/app/models/filter.model';
import { GetOffersService } from '../services/get-offers.service';
import { Subscription, pipe } from 'rxjs';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public catalogFilters: CatalogFiltersModel = {};
  public category;
  public href;

  offersList: OffersListInterface;

  catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private router: Router
  ) {

    // --------------check url params value---------------
    this._route.params.subscribe(Params => {
      this.catalogFilters.subCategory = Params.subCategory;
      this.GetOffersService.getOffers(this.catalogFilters);
      // ------- value of category for breadcrumbs
      this.category = Params.category;
    });

    // --------------check queryParams value---------------
    this._route.queryParams.subscribe(qParams => {
      if (qParams && (Object.keys(qParams).length === 0)) {
        console.log('queryParams is empty');
      } else {
        console.log("from query params");
        this.GetOffersService.getOffers(qParams);
      }
    });
    // console.log(this.offersList);
  }

  ngOnInit() {

    this.GetOffersService.offersList.subscribe(data => {
      this.offersList = data;
      console.log(this.offersList);
    });

    this.href = this.router.url;

    console.log(this.href);
  }
}
