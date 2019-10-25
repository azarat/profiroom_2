import { Component, OnInit } from '@angular/core';
import { GetOffersService } from '../../services/get-offers.service';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    private currentFilters: string = null;
    public subcategory;
    offersList: OffersListInterface;

    catalogSubscription: Subscription;

    constructor(
      // tslint:disable-next-line: no-shadowed-variable
      private GetOffersService: GetOffersService,
      // tslint:disable-next-line: variable-name
      private _route: ActivatedRoute,
    ) {

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

      this.GetOffersService.subCategory$.subscribe(data => {
        this.subcategory = data;
        this.GetOffersService.getOffers(this.currentFilters);
      });

      this.GetOffersService.offersList.subscribe(data => {

            this.offersList = data;
            // console.log( this.offersList);
          });
    }

    ngOnInit() {
      // console.log('start');

      // this.GetOffersService.getOffers(this.currentFilters);
    }




}
