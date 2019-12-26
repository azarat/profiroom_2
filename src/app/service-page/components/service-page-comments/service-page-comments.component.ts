import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';

@Component({
  selector: 'app-service-page-comments',
  templateUrl: './service-page-comments.component.html',
  styleUrls: ['./service-page-comments.component.scss']
})
export class ServicePageCommentsComponent implements OnInit {

  @Input() offerData: OfferDataInterface;
  public convertedNumberOfComments;

  constructor() { }

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
