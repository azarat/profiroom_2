import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { SimilarOffersInterface } from 'src/app/shared/interfaces/similar-offers.interface';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';

@Component({
  selector: 'app-service-page-similar-offers',
  templateUrl: './service-page-similar-offers.component.html',
  styleUrls: ['./service-page-similar-offers.component.scss']
})
export class ServicePageSimilarOffersComponent{

  public id;
  @Input() similarOffers: any;
  @Input() offerData: OfferDataInterface;
  constructor(
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
    private router: Router,
  ) {}

  openOffer(offerID) {
    const translatedPath: any = this.localize.translateRoute('/service');

    this.id = {
      offerId: offerID
    };

    this.router.navigate( [translatedPath], {
      relativeTo: this.route,
      queryParams: this.id,
    });
  }
}
