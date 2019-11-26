import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service-page.service';
import { Subscription } from 'rxjs';

import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {
  public offerId: object = null;
  public offerData: OfferDataInterface;
  catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private offerDataService: ServicePageService
  ) {
    this._route.queryParams
    .pipe(
      filter((res: any) => !! res),
      first()
    )
    .subscribe(offerId => {
      this.offerId = offerId;
    });
    // this.servicePageService.offerDate$
    // .pipe(filter((res: any) => !!res))
    // .subscribe(data => {
    //   this.offerData = data.userOffer;
    //   console.log(this.offerData);
    // });
  }

  ngOnInit() {

    if (this.offerId) {
      this.offerDataService.loadOfferDate(this.offerId)
      .pipe(filter((res: any) => !! res))
      .subscribe(offerData => {
        console.log(offerData);
        this.offerData = offerData.userOffer;
      })
    }


    // if(this.offerId)

    // this.offerDataService.loadOfferDate(offerId)
    // this.offerId = this._router.url.split('&offerId=')[1];
    // this.servicePageService.loadOfferDate(this.offerId);
  // }


  }
}
