import { Component, OnInit, Input } from '@angular/core';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import 'hammerjs';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-ngx-gallery',
  templateUrl: './ngx-gallery.component.html',
  styleUrls: ['./ngx-gallery.component.scss']
})
export class NgxGalleryComponent implements OnInit {
  @Input()offerData: OfferDataInterface;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private servicePageService: ServicePageService
  ) {}

  ngOnInit() {
    if (this.offerData.files !== null) {
      this.pushImagesToArray();
    }

    this.galleryOptions = [
      {
        width: '860px',
        height: '650px',
        // lazyLoading: false,
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewAnimation: true,
        imageInfinityMove: true,
        previewInfinityMove: true,
        thumbnailsPercent: 19.5,
        thumbnailsMargin: 8,
        thumbnailMargin: 8
      },
      // max-width 800
      {
        breakpoint: 1500,
        width: '630px',
        height: '480px',
        imagePercent: 80,

      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    $('.fantom_full-size').on('click', () => {
      $('.ngx-gallery-active').click();
    });
  }



  pushImagesToArray = () => {

    this.offerData.files.forEach(item => {
      this.galleryImages.push(
        {
          big: 'http://194.28.103.239/Backend/public/storage/offerFiles' + '/big/' + item,
          medium: 'http://194.28.103.239/Backend/public/storage/offerFiles' + '/medium/' + item,
          small: 'http://194.28.103.239/Backend/public/storage/offerFiles' +'/small/' + item,
        }
      );
    });

    // this.offerData.files.forEach(item => {
    //   this.galleryImages.push(
    //     {
    //       big: 'https://www.thecubetest.site/Backend/storage/app/' + this.offerData.filesDirectory + '/big/' + item,
    //       medium: 'https://www.thecubetest.site/Backend/storage/app/' + this.offerData.filesDirectory + '/medium/' + item,
    //       small: 'https://www.thecubetest.site/Backend/storage/app/' + this.offerData.filesDirectory + '/small/' + item,
    //     }
    //   );
    // });

  }
}
