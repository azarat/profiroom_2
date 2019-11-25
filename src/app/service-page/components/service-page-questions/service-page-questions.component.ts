import { Component, OnInit } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-service-page-questions',
  templateUrl: './service-page-questions.component.html',
  styleUrls: ['./service-page-questions.component.scss']
})
export class ServicePageQuestionsComponent implements OnInit {

  btnNumber = 1;
  public offerData: OfferDataInterface;

  constructor(
    private servicePageService: ServicePageService
  ) {
    this.servicePageService.offerDate$
    .pipe(filter((res: any) => !!res))
    .subscribe(data => {
      this.offerData = data.userOffer;
    });
   }

  ngOnInit() {
  }

  showfull(questionNumber) {
    if (questionNumber !== this.btnNumber) {
      this.btnNumber = questionNumber;
    } else {
      this.btnNumber = null;
    }
    console.log(this.btnNumber);
  }

}
