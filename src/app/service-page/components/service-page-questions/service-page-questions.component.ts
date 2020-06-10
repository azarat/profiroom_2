import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';


@Component({
  selector: 'app-service-page-questions',
  templateUrl: './service-page-questions.component.html',
  styleUrls: ['./service-page-questions.component.scss']
})
export class ServicePageQuestionsComponent {

  constructor() {}
  @Input() offerData: OfferDataInterface;

}
