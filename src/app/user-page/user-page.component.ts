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
import { WindowScrollBlockService } from '../core/services/window-scrolling.service';
import { onlineCont } from '../shared/consts/online.const';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnDestroy, OnInit  {

  public userData: UserDataInterface;
  sticky = false;
  elementPosition: any;
  onlineModel = onlineCont;
  openModalWindow: boolean = false;
  imagePointer: number;

  public clickedEducationImgs = null;
  public clickedSingleImg = null;
  public openEducationImgs = null;
  public userTypeFreelancer = 1;
  public userRole: string = 'Freelancer';

  public currentUserId: number;
  public academicDegreesTranslations = [
    'Бакалавр',
    'Магистр',
    'Аспирант',
    'Кандидат наук',
    'Доктор наук'
  ];
  public lvlTranslation = [
    'ranks.zero.title',
    'ranks.first.title',
    'ranks.second.title',
    'ranks.third.title',
    'ranks.forth.title'
  ];
  public monthTranslate = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  private id: any = null;
  private destroy$ = new Subject<undefined>();
  private windowScrolling: WindowScrollBlockService;
  public convertedDate = null;

  constructor(
    // tslint:disable-next-line: variable-name
    private _scrollToService: ScrollToService,
    private userService: UserDataService,
    private route: ActivatedRoute,
    private currentUserService: UserService,
    private localize: LocalizeRouterService,
    private router: Router,
    private _windowScrollBlockService: WindowScrollBlockService,
    // tslint:disable-next-line: variable-name
    private _location: Location,
    private localStorageService : LocalStorageService
  ) {
    this.windowScrolling = _windowScrollBlockService;
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$))
    .subscribe((params: Params) => {
      this.id = params;
      this.getUserData(this.id);
      window.scrollTo(0, 0);
    });

    this.currentUserId = Number(this.localStorageService.getItem('userId').value);
  }

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
    if (target === 'about' || target === 'education' ||
     target === 'rating' || target === 'comments' || target === 'services' || target === "add-education" ) {
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

// Open ChatRoom ws this collocutor
  public openChat(userId) {
    if (this.currentUserId === this.userData.id) {
      return;
    }
    this.currentUserService.wrightTo(userId)
      .subscribe((res: {id: number, roomId: string}) => {
        if (res.id) {
          const translatedPath: any = this.localize.translateRoute('/dashboard/chat-room');
          this.router.navigate([translatedPath], {
            relativeTo: this.route,
            queryParams: res
          });
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // img pop-up
  public showPopUp(i, thisArrNumber, kindOfImgs) {
    // this.windowScrolling.disable();
    this.clickedEducationImgs = this.clickedEducationImgs !== thisArrNumber? thisArrNumber: false;
    this.clickedSingleImg = this.clickedSingleImg !== i? i: false;
    this.openEducationImgs = kindOfImgs? true: false;
  }

  // switching user types
  // 0 - freelancer
  // 1 - customer
  public choseUser(x) {
    this.userTypeFreelancer = x === 0 ? 1 : 0;
    this.userRole = x === 0 ? 'Freelancer' : 'Customer';
    // pageType
  }

  public convertDateToDMY(x) {
    return this.convertedDate = x.slice(0, x.indexOf(' '));
  }
}
