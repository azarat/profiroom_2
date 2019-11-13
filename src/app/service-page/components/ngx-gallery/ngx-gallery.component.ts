import { Component, OnInit } from '@angular/core';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import 'hammerjs';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ngx-gallery',
  templateUrl: './ngx-gallery.component.html',
  styleUrls: ['./ngx-gallery.component.scss']
})
export class NgxGalleryComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  // galleryImages: NgxGalleryImage[] = [{
  //   big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg',
  //   medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg',
  //   small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg'
  // },
  // {
  //   big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png',
  //   medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png',
  //   small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png'
  // },
  // {
  //   big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg',
  //   medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg',
  //   small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg'
  // },
  // {
  //   big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg',
  //   medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg',
  //   small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile1.jpg'
  // },
  // {
  //   big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png',
  //   medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png',
  //   small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile2.png'
  // },
  // {
  //   big: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg',
  //   medium: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg',
  //   small: 'https://www.thecubetest.site/Backend/storage/app/' + 'offerFiles/testfile3.jpg'
  // },
  // ];

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
    if (this.offerData.files !== null) {
      this.pushImagesToArrey();
    }

    this.galleryOptions = [
      {
        width: '860px',
        height: '650px',
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageInfinityMove: true,
        thumbnailsPercent: 19.5,
        thumbnailsMargin: 8,
        thumbnailMargin: 8
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,

      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }



  pushImagesToArrey = () => {

    this.offerData.files.forEach(item => {
      this.galleryImages.push(
        {
          big: 'https://www.thecubetest.site/Backend/storage/app/' + this.offerData.filesDirectory + '/big/' + item,
          medium: 'https://www.thecubetest.site/Backend/storage/app/' + this.offerData.filesDirectory + '/medium/' + item,
          small: 'https://www.thecubetest.site/Backend/storage/app/' + this.offerData.filesDirectory + '/small/' + item,
        }
      );
    });

    console.log(this.galleryImages);
  }
}
