import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CatalogFiltersModel } from 'src/app/models/filter.model';
import { GetOffersService } from '../services/get-offers.service';
import { Subscription, pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public catalogFiltersModel: CatalogFiltersModel;
  public subcategory;

  catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
  ) {
    this.catalogFiltersModel =  {
      filterBy: '',
      subCategory: '',
      minPrice: null,
      maxPrice: null,
      maxTerm: '',
      PSD: false,
      PNG: false,
      commercial: false,
      confidentiality: false,
      agreement: false
    };

    this._route.params
    .subscribe(p => {
      this.GetOffersService.getOffers(p);
      this.catalogFiltersModel.subCategory = p.subCategory;
    });
  }

  ngOnInit() {}
}
