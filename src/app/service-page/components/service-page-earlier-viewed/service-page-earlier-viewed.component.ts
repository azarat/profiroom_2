import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';

import { ServicePageService } from '../../services/service-page.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-service-page-earlier-viewed',
  templateUrl: './service-page-earlier-viewed.component.html',
  styleUrls: ['./service-page-earlier-viewed.component.scss']
})
export class ServicePageEarlierViewedComponent implements OnInit {

  viewedOffers: OfferDataInterface = null;

  @Input() offerData: OfferDataInterface;
  constructor(
    private localStorageService: LocalStorageService,
    private servicePageService: ServicePageService,
  ) {

  }

  ngOnInit() {

    // console.log(this.localStorageService.getItem('visitedOffer').value)
// this.localStorageService.ge
    // this.servicePageService.getViewedOffers()
  }
}
