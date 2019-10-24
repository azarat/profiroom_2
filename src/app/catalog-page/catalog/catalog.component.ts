import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GetOffersService } from '../services/get-offers.service';
import { OffersListInterface } from '../../shared/interfaces/offers-list.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  offersList: OffersListInterface;
  private currentFilters: string;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
  ) {
    this._route.queryParams.subscribe(p => {
      if (p._filters !== undefined) {
          this.currentFilters = p._filters;
      }
      this.GetOffersService.getOffers(this.currentFilters);
    });
  }

  ngOnInit() {
    // this.CategorysListService.offersList$
    // .subscribe(res => {
    //   // console.log(res);
    //   this.offersList = res;
    // });
  }

}
