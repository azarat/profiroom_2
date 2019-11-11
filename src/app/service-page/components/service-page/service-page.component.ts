import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service-page.service';
import { Subscription } from 'rxjs';

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {
  public offerId;
  public offerData: OfferDataInterface;

  catalogSubscription: Subscription;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [{
    big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg',
    medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg',
    small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg'
  },
  {
    big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png',
    medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png',
    small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png'
  },
  {
    big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg',
    medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg',
    small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg'
  },
  {
    big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg',
    medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg',
    small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg'
  },
  {
    big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png',
    medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png',
    small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png'
  },
  {
    big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg',
    medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg',
    small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg'
  },
  ];

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private servicePageService: ServicePageService
  ) {
    this.servicePageService.offerDate$
    .pipe(filter((res: any) => !!res))
    .subscribe(data => {
      this.offerData = data.userOffer;

      // this.offerData.files.forEach(el => {
      //   this.galleryImages.push(el);
      // });

      // console.log(this.galleryImages);
      console.log(data);
      // this.galleryImages = [
      //   // big: 'offerFiles/testfile1.jpg',
      //   // medium: 'offerFiles/testfile2.jpg',
      //   // small: 'offerFiles/testfile3.jpg'
      // ];
    });
  }

  ngOnInit() {
    this.offerId = this._router.url.split('&offerId=')[1];
    this.servicePageService.loadOfferDate(this.offerId);

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageInfinityMove: true
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
