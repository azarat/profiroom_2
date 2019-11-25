import { Component, OnInit } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-service-page-packages',
  templateUrl: './service-page-packages.component.html',
  styleUrls: ['./service-page-packages.component.scss']
})
export class ServicePagePackagesComponent implements OnInit {

  private tab;
  private tabContent;

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
    this.tabContent = document.getElementsByClassName('tabContent');
    this.tab = document.getElementsByClassName('tab');

    this.hideTabsContent(0);
    this.showTabsConent(0);
  }

  hideTabsContent(argument) {
    for (let i = argument; i < this.tabContent.length; i++) {
      this.tabContent[i].classList.remove('show');
      this.tabContent[i].classList.add('hide');
      this.tab[i].classList.remove('active');
    }
  }

  showTabsConent(argument) {
    if (this.tabContent[argument].classList.contains('hide')) {
      this.hideTabsContent(0);
      this.tab[argument].classList.add('active');
      this.tabContent[argument].classList.remove('hide');
      this.tabContent[argument].classList.add('show');
    }
  }
}
