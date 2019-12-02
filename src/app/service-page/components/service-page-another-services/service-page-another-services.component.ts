import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { LocalizeRouterService } from 'localize-router';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-page-another-services',
  templateUrl: './service-page-another-services.component.html',
  styleUrls: ['./service-page-another-services.component.scss']
})
export class ServicePageAnotherServicesComponent implements OnInit {
  public id;
  @Input() offerData: OfferDataInterface;
  // public offerData: OfferDataInterface;

  constructor(
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
    private router: Router,
  ) {}

  ngOnInit() {
    // console.log(this.offerData);
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
