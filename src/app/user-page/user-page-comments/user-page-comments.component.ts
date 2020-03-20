import { Component, OnInit, Input } from '@angular/core';
import { UserDataInterface } from 'src/app/shared/interfaces/user-data.interface';

import {style, state, animate, transition, trigger} from '@angular/animations';
import { LocalizeRouterService } from 'localize-router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-page-comments',
  templateUrl: './user-page-comments.component.html',
  styleUrls: ['./user-page-comments.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        style({opacity: 1}),
        animate(1000, style({opacity: 0}))
      ])
    ])
  ] 
})
export class UserPageCommentsComponent implements OnInit {

  @Input() userData: UserDataInterface;
  public currentTab = 0;
  public id;

  public showAllchildComments = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
  ) { }

  ngOnInit() {
  }

  openOffer(offerid) {
    const translatedPath: any = this.localize.translateRoute('/service');

    this.id = {
      offerId: offerid
    };

    this.router.navigate( [translatedPath], {
      relativeTo: this.route,
      queryParams: this.id,
    });
  }

  public showMoreChileComments(x) {
    this.showAllchildComments !== x ? this.showAllchildComments = x : this.showAllchildComments = null;
  }


}
