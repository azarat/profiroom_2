import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-service-page-another-services',
  templateUrl: './service-page-another-services.component.html',
  styleUrls: ['./service-page-another-services.component.scss']
})
export class ServicePageAnotherServicesComponent implements OnInit {

  @Input() offerData: OfferDataInterface;
  // public offerData: OfferDataInterface;

  constructor( ) {}

  ngOnInit() {
    console.log(this.offerData);
  }

  openOffer() {}

}
