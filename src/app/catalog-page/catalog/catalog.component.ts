import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GetOffersService } from '../services/get-offers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  // offersList: OffersListInterface;
  private currentFilters: string;
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
    this._route.queryParams.subscribe(p => {
      this.GetOffersService.getOffers(p);
    });
  }

  ngOnInit() {

  }
}
