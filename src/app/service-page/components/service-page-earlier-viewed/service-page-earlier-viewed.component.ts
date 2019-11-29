import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ServicePageService } from '../../services/service-page.service';

@Component({
  selector: 'app-service-page-earlier-viewed',
  templateUrl: './service-page-earlier-viewed.component.html',
  styleUrls: ['./service-page-earlier-viewed.component.scss']
})
export class ServicePageEarlierViewedComponent implements OnInit {

  viewedOffers: OfferDataInterface;

  @Input() offerData: OfferDataInterface;
  constructor(
    private sessionStorage: LocalStorageService,
    private servicePageService: ServicePageService,
  ) {
    this.servicePageService.viewedOffers$.subscribe(res => {
      this.viewedOffers = res;
    });
  }

  ngOnInit() {

  }
}
