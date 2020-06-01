import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-service-page-about-offer',
  templateUrl: './service-page-about-offer.component.html',
  styleUrls: ['./service-page-about-offer.component.scss']
})
export class ServicePageAboutOfferComponent implements OnInit {
  @Input() offerData: OfferDataInterface;
  public convertedNumberOfComments;

  public lvlTranslation = [
    'ranks.zero.title',
    'ranks.first.title',
    'ranks.second.title',
    'ranks.third.title',
    'ranks.forth.title'
  ];

  constructor(
    private servicePageService: ServicePageService
  ) { }

  ngOnInit() {
    this.formateCommentCount();
  }

  formateCommentCount() {
    if (this.offerData.comments_count < 1000) {
      this.convertedNumberOfComments = this.offerData.comments_count;
    } else {
      this.convertedNumberOfComments = this.offerData.comments_count.toFixed(1) + "k+";
    }
  }
}
