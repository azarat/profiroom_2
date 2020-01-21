import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { UserDataInterface } from '../shared/interfaces/user-data.interface';
import { UserDataService } from './service/user.service';
import { filter } from 'rxjs/internal/operators/filter';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public userData: UserDataInterface;
  sticky = false;
  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  private id: any;


  constructor(
    // tslint:disable-next-line: variable-name
    private _scrollToService: ScrollToService,
    private userService: UserDataService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params=>
      this.id = params);

    console.log(this.id);
    this.getUserData(this.id);
  }

  ngOnInit() {}

  getUserData(id: {id: number}) {
    this.userService.loadUserDate(id)
    .pipe(filter((res: any) => !! res))
    .subscribe(userData => {
      console.log(userData);
      this.userData = userData.user;
    });
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
