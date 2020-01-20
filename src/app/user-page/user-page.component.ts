import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  sticky = false;
  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  constructor(
    private _scrollToService: ScrollToService,
  ) { }

  ngOnInit() {
  }

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
