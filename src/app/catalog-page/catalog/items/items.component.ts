import { Component, OnInit } from '@angular/core';
import { GetOffersService } from '../../services/get-offers.service';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  public subcategory;
  public id;
  offersList: OffersListInterface;

  catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.GetOffersService.offersList.subscribe(data => {
      this.offersList = data;
      // console.log( this.offersList);
    });
  }

  ngOnInit() {}

  openOffer(offerid) {
    this.id = {
      offerId: offerid
    };
    // this.GetOffersService.showOffer(this.id);
    this.router.navigate( ['/service'], {
      relativeTo: this.route,
      queryParams: this.id,
      queryParamsHandling: 'merge'
    });
  }
}
