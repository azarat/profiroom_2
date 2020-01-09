import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GetOffersService } from '../services/get-offers.service';
import { Subscription, pipe } from 'rxjs';
import { first } from 'rxjs/operators';

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

  }

  ngOnInit() {
    this.GetOffersService.subCategory$.subscribe(data => {
      this.subcategory = data;
      console.log('subcategories', this.subcategory);
      const y = {
        subCategory : this.subcategory
      };
      console.log(y);
      this.GetOffersService.getOffers(y);
      console.log("catalog component ngOnInit - from subCategory$.subscribe");
    });
    // this._route.queryParams
    // .subscribe(p => {

    //   if ( p.subCategory === undefined) {
    //     const x = {
    //       subCategory : this.subcategory
    //     };

    //     this.GetOffersService.getOffers(x);
    //     console.log("catalog component ngOnInit - from query params");
    //     return;
    //   }
    //   console.log('test', p.subCategory);
    //   this.GetOffersService.getOffers(p);
    // });



  }
}
