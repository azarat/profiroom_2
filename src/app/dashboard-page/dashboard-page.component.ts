import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthentificationService } from '../core/services/auth.service';

import { UserService } from '../core/services/user.service';
import { dashboardMenuConst } from './consts/dashboard-menu.const';
import { plainToClass } from 'class-transformer';

import { UserModel } from '../models/user.model';
import { LocalStorageService } from '../core/services/local-storage.service';
import { SocketService } from '../chat/services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, AfterViewInit {

  color = 'accent';
  checked = false;
  disabled = false;
  dashboardMenu = dashboardMenuConst;
  user: UserModel;
  socket: string = null;
  public newMessage: boolean = null;
  constructor(
    private authService: AuthentificationService,
    private userService: UserService,
    private socetService: SocketService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.notifyShow();

    this.userService.getDashboardRes()
      .subscribe((res: any) => {
        console.log(res);
        this.user = plainToClass(UserModel, res[0]);
        this.authService.saveUserId(this.user.id);
        this.localStorageService.setItem('userImage', this.user.avatar);
      });

    this.socetService.connect();

    this.socetService.checkNotifications()
      .subscribe(res => {
        console.log('new message', res)
        this.newMessage = true;
      });

  }

  ngAfterViewInit() {

  }

  userExit = () => {
    this.authService.logOut();
  }

  public openChat(link) {
    this.notifyShow(link);
  }

  notifyShow(link?: string) {
    const url = this.router.url;
    if (url.includes('chat-room')) {
      this.newMessage = null;
    } else if (link === 'chat') {
      this.newMessage = null;
    }
  }

}
