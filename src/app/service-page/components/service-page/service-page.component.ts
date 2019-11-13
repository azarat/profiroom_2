import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service-page.service';
import { Subscription } from 'rxjs';


import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {
  public offerId;
  public offerData: OfferDataInterface;
  catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private servicePageService: ServicePageService
  ) {
    this.servicePageService.offerDate$
    .pipe(filter((res: any) => !!res))
    .subscribe(data => {
      this.offerData = data.userOffer;
    });
  }

  ngOnInit() {
    this.offerId = this._router.url.split('&offerId=')[1];
    this.servicePageService.loadOfferDate(this.offerId);
  }

}
