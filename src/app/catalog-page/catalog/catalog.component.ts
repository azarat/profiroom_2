import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GetOffersService } from '../services/get-offers.service';
import { OffersListInterface } from '../../shared/interfaces/offers-list.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  // offersList: OffersListInterface;
  private currentFilters: string = null;
  public subcategory;

  catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
  ) {
    this.GetOffersService.subCategory$.subscribe(data => {
      this.subcategory = data;
    });
  }

  ngOnInit() {
    console.log('start');
    this._route.queryParams.subscribe(p => {
      if (p._filters !== undefined) {
          // console.log(this.currentFilters);
      }
      // console.log(this.currentFilters);
      // this.GetOffersService.getOffers(this.currentFilters);
      // this.GetOffersService.offersList.subscribe(data => {
      //   this.offersList = data;
      //   console.log(this.offersList);
      // });
    });
    this.GetOffersService.getOffers(this.currentFilters);
  }



}
