import { Component, OnInit } from '@angular/core';
import { GetOffersService } from '../../services/get-offers.service';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-items',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.scss']
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
    private localize: LocalizeRouterService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.GetOffersService.offersList.subscribe(data => {
      this.offersList = data;
    });
  }

  openOffer(offerid) {
    const translatedPath: any = this.localize.translateRoute('/service');

    this.id = {
      offerId: offerid
    };

    this.router.navigate( [translatedPath], {
      relativeTo: this.route,
      queryParams: this.id,
    });
  }
}
