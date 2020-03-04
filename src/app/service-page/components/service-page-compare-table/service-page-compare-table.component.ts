import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';

@Component({
  selector: 'app-service-page-compare-table',
  templateUrl: './service-page-compare-table.component.html',
  styleUrls: ['./service-page-compare-table.component.scss']
})
export class ServicePageCompareTableComponent implements OnInit {

  @Input() offerData: OfferDataInterface;
  public packages = [
    'basic',
    'advanced',
    'premium'
  ];
  public services = [
    {
      serviceName: 'Название услуги',
      serviceValue: 'title',
      centerMode: 0
    },
    {
      serviceName: 'Краткое описание',
      serviceValue: 'description',
      centerMode: 0
    },
    {
      serviceName: 'Срок выполнения',
      serviceValue: 'term',
      centerMode: 1,
      extraWord: " дней"
    },
    {
      serviceName: 'Кол-во правок',
      serviceValue: 'changes',
      centerMode: 1,
      extraWord: " правок"
    }
  ];

  public priceTitle = [
    {
      priceName: 'Цена',
    }
  ];

  constructor() { }

  ngOnInit() {
    console.log("start");
    console.log(this.offerData.main_options);
  }

}
