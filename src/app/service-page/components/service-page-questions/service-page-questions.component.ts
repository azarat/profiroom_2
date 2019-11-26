import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';


@Component({
  selector: 'app-service-page-questions',
  templateUrl: './service-page-questions.component.html',
  styleUrls: ['./service-page-questions.component.scss']
})
export class ServicePageQuestionsComponent implements OnInit {
  panelOpenState = false;
  btnNumber = 0;

  constructor() {}
  @Input() offerData: OfferDataInterface;
  ngOnInit() {}

  showfull(questionNumber) {
    if (questionNumber !== this.btnNumber) {
      this.btnNumber = questionNumber;
    } else {
      this.btnNumber = null;
    }
    console.log(this.btnNumber);
  }

}
