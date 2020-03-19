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
export class UserPageComponent implements OnDestroy, OnInit  {

  public userData: UserDataInterface;
  sticky = false;
  elementPosition: any;

  openModalWindow:boolean=false;
  imagePointer:number;
  // public images: {
  //   thumb: string, 
  //   img: string, 
  //   description: string
  // } [] = [];

  public  images = [
    { thumb: 'http://194.28.103.239/Backend/public/storage/offerFiles/medium/testfile3.jpeg', img: 'http://194.28.103.239/Backend/public/storage/offerFiles/medium/testfile3.jpeg', description: 'Image 1' },
    { thumb: 'http://194.28.103.239/Backend/public/storage/offerFiles/medium/testfile2.png', img: 'http://194.28.103.239/Backend/public/storage/offerFiles/medium/testfile2.png', description: 'Image 2' },
  ];

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
    // tslint:disable-next-line: variable-name
    private _location: Location
  ) {
    this.route.params.pipe(takeUntil(this.destroy$))
    .subscribe((params: Params) => {
      this.id = params;
      this.getUserData(this.id);
      window.scrollTo(0, 0);
    });
    
  }

  ngOnInit() {}

  public initImagesArray() {
    this.userData.education.forEach((el: any) => {
      console.log(el);
      // this.images.push(this.images.thumb = )
    });
  }

  getUserData(id: { id: number }) {
    this.userService.loadUserDate(id)
      .pipe(filter((res: any) => !!res))
      .subscribe(userData => {

        this.userData = userData.user;
        console.log(this.userData);
        this.initImagesArray();
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

  // img pop-up
  public OpenImageModel(imageSrc,images) {
    //alert('OpenImages');
    console.log('img');
    var imageModalPointer;
    for (var i = 0; i < images.length; i++) {
           if (imageSrc === images[i].img) {
             imageModalPointer = i;
             console.log('jhhl',i);
             break;
           }
      }
    this.openModalWindow = true;
    this.images = images;
    this.imagePointer  = imageModalPointer;
  }
  cancelImageModel() {
    this.openModalWindow = false;
  }
}
