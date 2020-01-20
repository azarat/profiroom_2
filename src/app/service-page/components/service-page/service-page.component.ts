import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service-page.service';
import { Subscription } from 'rxjs';

import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';


@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {
  // public offerId: object = null;
  public offerData: OfferDataInterface = null;
  catalogSubscription: Subscription;
  // tslint:disable-next-line: variable-name
  public convertedNumberOfComments;
  viewedOffers: any = null;

  sticky = false;
  elementPosition: any;

  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private offerDataService: ServicePageService,
    // tslint:disable-next-line: variable-name
    private _scrollToService: ScrollToService,
    private localStorageService: LocalStorageService
  ) {
    this._route.queryParams
    .pipe(
      filter((res: any) => !! res),
    )
    .subscribe(offerId => {
      this.getOfferData(offerId);
      this.getViewedOffers();
    });
  }





  ngOnInit() { }

  getOfferData(offerId: {offerId: string}) {
    this.offerDataService.loadOfferDate(offerId)
    .pipe(filter((res: any) => !! res))
    .subscribe(offerData => {
      // console.log(offerData);
      this.offerData = offerData.userOffer;
      this.pushOfferIdToLocalStorage(offerId.offerId);
      this.formateCommentCount();
    });
  }

  pushOfferIdToLocalStorage(id: string) {
    //
    let offersArrey: any[] = [];

    const storage = this.localStorageService.getItem('visitedOffer');

    if (storage.value !== null) {

      offersArrey = Object.values(this.localStorageService.getItem('visitedOffer').value);
      if (offersArrey.includes(id)) {
          return;
      }
      if (offersArrey.length < 4) {
        offersArrey.push(id);
        console.log(offersArrey.length);
      } else {
        offersArrey.push(id);
        offersArrey.splice(0, 1);
      }

    } else if (storage.value === null) {
      offersArrey.push(id);
    }

    this.localStorageService.setItem('visitedOffer', offersArrey);
  }

  formateCommentCount() {
    if (this.offerData.comments_count < 1000) {
      this.convertedNumberOfComments = this.offerData.comments_count;
    } else {
      this.convertedNumberOfComments = this.offerData.comments_count.toFixed(1) + 'k+';
    }
  }

  getViewedOffers() {
    let x: string[];
    if (this.localStorageService.getItem('visitedOffer').value !== null) {
      x = Object.values(this.localStorageService.getItem('visitedOffer').value);
    } else {
      x = [];
    }

    this.offerDataService.getViewedOffers(x)
    .subscribe((res: any) => {
      this.viewedOffers = res.visitedOffers;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  // ** navbar always in top of page
  @HostListener('window:scroll')
  handleScroll() {
    const windowScroll = window.pageYOffset;
    // if (windowScroll >= this.elementPosition){
    if (windowScroll >= 113) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  // ** scroll to configuration
  scrollTo(target: string) {
    const config: ScrollToConfigOptions = {
      target,
      duration: 1000
    };

    if (target === 'about-offer' ) {
      config.offset = -90;
    } else if (target === 'rating' || target === 'compare-table' ||
     target === 'description' || target === 'comments' || target === 'questions' ) {
      config.offset = -80;
    } else if (target === 'portfolio'  ) {
      config.offset = -105;
    }
    console.log(config);
    this._scrollToService.scrollTo(config);
  }


}
