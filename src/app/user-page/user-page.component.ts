import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { UserDataInterface } from '../shared/interfaces/user-data.interface';
import { UserDataService } from './service/user.service';
import { filter } from 'rxjs/internal/operators/filter';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { LocalizeRouterService } from 'localize-router';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public userData: UserDataInterface;
  sticky = false;

  public academicDegreesTranslations = [
    'Начальный ',
    'Ниже среднего',
    'Средний ',
    'Выше среднего',
    'Князь тьмы'
  ];

  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;

  private id: any;


  constructor(
    // tslint:disable-next-line: variable-name
    private _scrollToService: ScrollToService,
    private userService: UserDataService,
    private route: ActivatedRoute,
    private currentUserService: UserService,
    private localize: LocalizeRouterService,
    private router: Router,

  ) {
    this.route.params.subscribe(params =>
      this.id = params);
    this.getUserData(this.id);
  }

  ngOnInit() { }

  getUserData(id: { id: number }) {
    this.userService.loadUserDate(id)
      .pipe(filter((res: any) => !!res))
      .subscribe(userData => {
        this.userData = userData.user;
      });
  }

  scrollTo(target: string) {


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

  // Open ChatRoom ws this collocutor
  public openChat(userId) {
    this.currentUserService.wrightTo(userId)
      .subscribe(res => {
        if (res === 'ok') {
          const translatedPath: any = this.localize.translateRoute('/dashboard/chat-room');
          this.router.navigate([translatedPath]);
        }
      });
  }
}
