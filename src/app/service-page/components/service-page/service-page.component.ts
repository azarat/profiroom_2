import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service-page.service';
import { Subscription } from 'rxjs';

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {
  public offerId;
  public offerDate;

  catalogSubscription: Subscription;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private _router: Router, // tslint:disable-next-line: variable-name
    private servicePageService: ServicePageService
  ) {
    this.servicePageService.offerDate.subscribe(data => {
      this.offerDate = data;
      // console.log( this.offersList);
    });
  }

  ngOnInit() {
    this.offerId = this._router.url.split('&offerId=')[1];
    console.log(this.offerId);
    this.servicePageService.loadOfferDate(this.offerId);

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }
}
