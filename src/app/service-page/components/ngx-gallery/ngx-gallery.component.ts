import { Component, OnInit } from '@angular/core';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
  selector: 'app-ngx-gallery',
  templateUrl: './ngx-gallery.component.html',
  styleUrls: ['./ngx-gallery.component.scss']
})
export class NgxGalleryComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '860px',
        height: '650px',
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
