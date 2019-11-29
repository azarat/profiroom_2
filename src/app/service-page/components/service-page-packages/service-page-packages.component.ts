import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';

@Component({
  selector: 'app-service-page-packages',
  templateUrl: './service-page-packages.component.html',
  styleUrls: ['./service-page-packages.component.scss']
})
export class ServicePagePackagesComponent implements OnInit {

  @Input() offerData: OfferDataInterface;
  public currentTab: any = 0;
  public tabs = [
    {
      name: 'базовый'
    },
    {
      name: 'стандарт'
    },
    {
      name: 'премиум'
    }
  ];
  public packages = [
    'basic',
    'advanced',
    'premium'
  ];


  constructor() {}

  ngOnInit() { }

  openTab = (i: number) => {
    this.currentTab = i;
  }
}
