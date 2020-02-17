import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';

@Component({
  selector: 'app-service-page-packages',
  templateUrl: './service-page-packages.component.html',
  styleUrls: ['./service-page-packages.component.scss']
})
export class ServicePagePackagesComponent implements OnInit {

  @Input() offerData: OfferDataInterface;
  @Input() offerId;

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


  constructor(
    private servicePackageService: ServicePageService
  ) { }

  ngOnInit() { }

  openTab = (i: number) => {
    this.currentTab = i;
  }

  public orderService(_package: string) {
    this.servicePackageService.createDeal(this.offerId, _package);
  }
}
