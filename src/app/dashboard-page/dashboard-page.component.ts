import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthentificationService } from '../core/services/auth.service';

import { UserService } from '../core/services/user.service';
import { dashboardMenuConst } from './consts/dashboard-menu.const';
import { plainToClass } from 'class-transformer';

import { UserModel } from '../models/user.model';
import { LocalStorageService } from '../core/services/local-storage.service';
import { SocketService } from '../chat/services/socket.service';
import { Router } from '@angular/router';
import { UserStateService } from './services/user-state.service';

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

  constructor(
    private authService: AuthentificationService,
    private userService: UserService,
    private socetService: SocketService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userStatseService: UserStateService
  ) {

  }

  ngOnInit() {
    this.notifyShow();
    this.defineCurrentUser();
    this.socetService.connect();
    this.checkNotifications();

  }

  ngAfterViewInit() {

  }

  private defineCurrentUser() {
    this.userService.getDashboardRes()
      .subscribe((res: any) => {
        this.user = plainToClass(UserModel, res[0]);
        this.userStatseService.setUserState(this.user.role_id);
        this.authService.saveUserId(this.user.id);
        this.localStorageService.setItem('userImage', this.user.avatar);
        this.localStorageService.setItem('userRole', this.user.role_id);
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
          this.localStorageService.setItem('userRole', res.newRole);
          this.userStatseService.setUserState(res.newRole);
        });
    }
  }

}
