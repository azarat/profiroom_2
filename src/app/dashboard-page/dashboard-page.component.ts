import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthentificationService } from '../core/services/auth.service';

import { UserService } from '../core/services/user.service';
import { dashboardMenuConst } from './consts/dashboard-menu.const';
import { plainToClass } from 'class-transformer';

import { UserModel } from '../models/user.model';
import { LocalStorageService } from '../core/services/local-storage.service';
import { SocketService } from '../core/services/socket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStateService } from './services/user-state.service';
import { LocalizeRouterService } from 'localize-router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SiteLocaleService } from '../core/services/site-locale.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, AfterViewInit {

  color = 'accent';
  // public checked = false;
  // public disabled = false;
  public dashboardMenu = dashboardMenuConst;
  public user: UserModel;
  private socket: string = null;
  public newMessage: boolean = null;
  public newWorkMessage: boolean = null;
  public sideMenuClose = true;
  public mobileMenuOpen = false;
  public userLvls = [];


  constructor(
    private authService: AuthentificationService,
    private userService: UserService,
    private socetService: SocketService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userStatseService: UserStateService,
    private localize: LocalizeRouterService,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private siteLocaleService: SiteLocaleService
  ) {

  }

  ngOnInit() {
    this.checkCurrentLang();
    this.notifyShow();
    this.defineCurrentUser();
    this.subscribeUserMinData();
    this.createLvlsArr();
  }

  ngAfterViewInit() {

  }
  private createLvlsArr(){
    for (var i = 0; i <= 4; i++) {
      this.userLvls.push(i);
    }
  }
  private checkCurrentLang() {
    let lang = this.localize.parser.currentLang;
    this.siteLocaleService.changeLangTo(lang);
  }

  private defineCurrentUser() {
    this.userService.getMinUserData()

  }

  private subscribeUserMinData() {
    this.userService.user$
    .pipe(filter((res) => !!res))
     .subscribe((res: any) => {
        this.user = plainToClass(UserModel, res);
        this.socketService.connect();
        // this.checkNotifications();
        this.userStatseService.setUserState(this.user.role_id);
        this.authService.saveUserId(this.user.id);
        this.localStorageService.setItem('userImage', this.user.avatar);
        this.userStatseService.setUserState(this.user.role_id);
        this.redirectToFinancesIfCustomer();
      });

  }

  userExit = () => {
    this.authService.logOut();
  }

  public openChat(link) {
    this.notifyShow(link);

  }

  notifyShow(link?: string) {
    const url = this.router.url;

    if (url.includes('chat-room') || link === 'chat') {
      this.newMessage = null;
    } else if (url.includes('projects') || link === 'projects') {
      this.newWorkMessage = null;
    }
  }
  private checkNotifications() {
    this.socetService.checkNotifications()
      .subscribe((res: any) => {
        console.log(res);
        if (res.chatType === 'work') {
          this.newWorkMessage = true;
        } else if (res.chatType === 'classic') {
          this.newMessage = true;
        }
      });
  }

  // tslint:disable-next-line: variable-name
  public changeUserType(_userType?: number) {

    if (this.user.role_id !== _userType) {
      this.userStatseService.toggleUserState()
        .subscribe((res: any) => {
          this.user.role_id = res.newRole;
          this.userStatseService.setUserState(res.newRole);
          // this.redirectToFinancesIfCustomer();

        });
    }
  }

  private redirectToFinancesIfCustomer() {
    const url = this.router.url;
    if (this.user.role_id === 2 &&  url.includes('my-services')) {
      const translatedPath: any = this.localize.translateRoute('/dashboard/home');
      this.router.navigate([translatedPath],
      {
        relativeTo: this.activatedRoute,
      });
    }
  }

  public toggleSideMenu() {
    this.sideMenuClose = !this.sideMenuClose;
  }
  public toggleMobileSideMenu() {
    console.log('toogle');
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  public closeMobileMenu(x) {
    console.log(x);

    if (x) {
      console.log('close');
      this.mobileMenuOpen = false;
    }
    // setTimeout(() => {
    //   if (this.mobileMenuOpen === true) {
    //     console.log('close');
    //     this.mobileMenuOpen = false;
    //   }
    // }, 100);
  }
}
