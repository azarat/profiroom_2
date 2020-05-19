import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { LocalizeRouterService } from 'localize-router';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-page-another-services',
  templateUrl: './service-page-another-services.component.html',
  styleUrls: ['./service-page-another-services.component.scss']
})
export class ServicePageAnotherServicesComponent implements OnInit {
  public id;
  @Input() offerData: OfferDataInterface;

  private breakPointValue: number;
  public laptopScreen = false;
  public showedOffersCount = 0;

  constructor(
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.breakPointValue = window.innerWidth;
    if(this.breakPointValue < 1499) {
      this.laptopScreen = true;
      this.offersCounting(4);
    } else {
      this.laptopScreen= false
      this.offersCounting(5);
    }
  }

  offersCounting(limit) {
    for(let x = 0; x <= limit; x++) {
      this.showedOffersCount = x;
    }
  }

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
