import { Component, OnInit } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-about-offer',
  templateUrl: './about-offer.component.html',
  styleUrls: ['./about-offer.component.scss']
})
export class AboutOfferComponent implements OnInit {
  public offerData: OfferDataInterface;
  constructor(
    private servicePageService: ServicePageService
  ) {
    this.servicePageService.offerDate$
    .pipe(filter((res: any) => !!res))
    .subscribe(data => {
      this.offerData = data.userOffer;
      console.log(this.offerData);
      console.log(this.offerData.positiveComments);
    });
  }

  ngOnInit() {
  }

}
