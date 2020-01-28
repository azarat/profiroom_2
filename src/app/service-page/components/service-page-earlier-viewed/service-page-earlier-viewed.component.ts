import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { SimilarOffersInterface } from 'src/app/shared/interfaces/similar-offers.interface';

@Component({
  selector: 'app-service-page-earlier-viewed',
  templateUrl: './service-page-earlier-viewed.component.html',
  styleUrls: ['./service-page-earlier-viewed.component.scss']
})
export class ServicePageEarlierViewedComponent implements OnInit {

  public id;
  @Input() similarOffers: SimilarOffersInterface;
  constructor(
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
    private router: Router,
  ) { }

  ngOnInit() {}
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
