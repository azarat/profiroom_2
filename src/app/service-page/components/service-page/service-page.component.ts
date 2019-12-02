import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service-page.service';
import { Subscription } from 'rxjs';

import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { filter, first } from 'rxjs/operators';


@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {

  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  public offerId: object = null;
  public offerData: OfferDataInterface;
  catalogSubscription: Subscription;
  public comments_countF;


  sticky: boolean = false;
  elementPosition: any;

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private offerDataService: ServicePageService
  ) {
    this._route.queryParams
    .pipe(
      filter((res: any) => !! res),
      first()
    )
    .subscribe(offerId => {
      this.offerId = offerId;
    });
    // this.servicePageService.offerDate$
    // .pipe(filter((res: any) => !!res))
    // .subscribe(data => {
    //   this.offerData = data.userOffer;
    //   console.log(this.offerData);
    // });
  }

  ngOnInit() {
    if (this.offerId) {
      this.offerDataService.loadOfferDate(this.offerId)
      .pipe(filter((res: any) => !! res))
      .subscribe(offerData => {
        console.log(offerData);
        this.offerData = offerData.userOffer;

        this.formateCommentCount();
      });
    }

  }



  formateCommentCount() {
    if (this.offerData.comments_count < 1000) {
      this.comments_countF = this.offerData.comments_count;
    } else {
      this.comments_countF = this.offerData.comments_count.toFixed(1);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
    console.log(this.elementPosition);
    // console.log(this.menuElement);
  }

  @HostListener('window:scroll', ['$event'])
  // handleScroll() {
    // const windowScroll = window.pageYOffset;
    // if (windowScroll >= this.elementPosition) {
    //   // console.log(this.elementPosition);
    //   console.log(this.menuElement.nativeElement);
    //   this.sticky = true;
    //   console.log(this.sticky);
    // } else {
    //   this.sticky = false;
    //   console.log(this.sticky);
    // }
  // }

  handleScroll(event){
    const windowScroll = window.pageYOffset;
    console.log(this.elementPosition);
    // if (windowScroll >= this.elementPosition){
    if (windowScroll >= 113){
      this.sticky = true;
    } else {
      this.sticky = false; }
    }
}
