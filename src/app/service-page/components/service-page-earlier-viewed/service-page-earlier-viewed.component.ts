import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';

import { ServicePageService } from '../../services/service-page.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-service-page-earlier-viewed',
  templateUrl: './service-page-earlier-viewed.component.html',
  styleUrls: ['./service-page-earlier-viewed.component.scss']
})
export class ServicePageEarlierViewedComponent implements OnInit {

  public id;
  @Input() viewedOffers;
  constructor(
    private localStorageService: LocalStorageService,
    private servicePageService: ServicePageService,
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
    private router: Router,
  ) {
    // console.log(this.viewedOffers);
    // const x: string[] = Object.values(this.localStorageService.getItem('visitedOffer').value);
    // // console.log('start');
    // this.servicePageService.getViewedOffers(x)
    // .subscribe(res => {
    //   console.log('cc')
    //   this.viewedOffers = res;
    //   console.log(this.viewedOffers);
    // });
  }

  ngOnInit() {
    console.log(this.viewedOffers);
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
