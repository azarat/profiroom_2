import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service-page.service';
import { Subscription } from 'rxjs';

import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { SimilarOffersInterface } from 'src/app/shared/interfaces/similar-offers.interface';
import { UserService } from 'src/app/core/services/user.service';
import { LocalizeRouterService } from 'localize-router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {
  public offerData: OfferDataInterface = null;
  catalogSubscription: Subscription;
  // tslint:disable-next-line: variable-name
  public convertedNumberOfComments;
  public similarOffers: SimilarOffersInterface = null;
  public offerId;
  public sticky = false;
  elementPosition: any;

  public messageNotAuthorized: boolean;

  public step2 = false;
  public chosenOnOfferPage: string;

  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;
  
  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private servicePageService: ServicePageService,
    // tslint:disable-next-line: variable-name
    private _scrollToService: ScrollToService,
    private currentUserService: UserService,
    private localize: LocalizeRouterService,
    private router: Router,
    private titleService: Title

  ) {
    this._route.queryParams
      .pipe(
        filter((res: any) => !!res),
      )
      // tslint:disable-next-line: variable-name
      .subscribe(_offerId => {
        this.getOfferData(_offerId);
        this.getSimilarOffers(_offerId);
        window.scrollTo(0, 0);
        this.offerId = +_offerId.offerId;
        
      });

      servicePageService.getSpinnerState().subscribe(data => {
        this.messageNotAuthorized = data;
      });     
  }


  ngOnInit() { 
    // this.offerDataService.dataChange
    
  }

  getOfferData(offerId: { offerId: string }) {
    this.servicePageService.loadOfferDate(offerId)
    .pipe(filter((res: any) => !! res))
    .subscribe(offerData => {
      this.offerData = offerData.userOffer;
      // console.log(this.offerData);
      this.formateCommentCount();
      this.titleService.setTitle('Gigrum | ' +  this.offerData.title);
    });
  }

  // Open ChatRoom ws this collocutor
  public openChat(userId) {
    console.log('go chat');
    this.currentUserService.wrightTo(userId)
      .subscribe(res => {
        if (res === 'ok') {
          const translatedPath: any = this.localize.translateRoute('/dashboard/chat-room');
          this.router.navigate([translatedPath]);
        } 
      });
        
      const translatedPath: any = this.localize.translateRoute('/dashboard/chat-room');
      this.router.navigate([translatedPath]);
  }

  private formateCommentCount() {
    if (this.offerData.comments_count < 1000) {
      this.convertedNumberOfComments = this.offerData.comments_count;
    } else {
      this.convertedNumberOfComments = this.offerData.comments_count.toFixed(1) + 'k+';
    }
  }

  public getSimilarOffers(offerId: { offerId: string }) {
    this.servicePageService.similarOffers(offerId)
      .subscribe((res: any) => {

      this.similarOffers = res;
      // console.log(this.similarOffers);
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
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
  public scrollTo(target: string) {
    const config: ScrollToConfigOptions = {
      target,
      duration: 1000
    };

    if (target === 'about-offer') {
      config.offset = -90;
    } else if (target === 'rating' || target === 'compare-table' ||
      target === 'description' || target === 'comments' || target === 'questions') {
      config.offset = -80;
    } else if (target === 'portfolio') {
      config.offset = -105;
    }
    this._scrollToService.scrollTo(config);
  }

  public openCheckout(packageForm) {
    this.chosenOnOfferPage = packageForm;
    this.step2 = true;
  }
  public hideCheckout() {
    this.step2 = false;
  }

  public closeErrorMessage() {
    this.servicePageService.setSpinnerState(false);
  }
}
