import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { UserDataInterface } from '../shared/interfaces/user-data.interface';
import { UserDataService } from './service/user.service';
import { filter } from 'rxjs/internal/operators/filter';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { LocalizeRouterService } from 'localize-router';
import {Location} from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnDestroy  {

  public userData: UserDataInterface;
  sticky = false;
  elementPosition: any;
  public academicDegreesTranslations = [
    'Начальный ',
    'Ниже среднего',
    'Средний ',
    'Выше среднего',
    'Князь тьмы'
  ];
  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  private id: any = null;
  private destroy$ = new Subject<undefined>();


  constructor(
    // tslint:disable-next-line: variable-name
    private _scrollToService: ScrollToService,
    private userService: UserDataService,
    private route: ActivatedRoute,
    private currentUserService: UserService,
    private localize: LocalizeRouterService,
    private router: Router,
    private _location: Location
  ) {

    this.route.params.pipe(takeUntil(this.destroy$))
    .subscribe((params: Params) => {
      console.log(params);
      this.id = params;
      this.getUserData(this.id);
      window.scrollTo(0, 0);
    });

    

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
    if (target === 'about' || target === 'aducation' ||
     target === 'rating' || target === 'comments' || target === 'services' ) {
      config.offset = -70;
    }
    this._scrollToService.scrollTo(config);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll')
  handleScroll() {
    const windowScroll = window.pageYOffset;
    // if (windowScroll >= this.elementPosition){
    if (windowScroll >= 113) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  goBack() {
    this._location.back();
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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
