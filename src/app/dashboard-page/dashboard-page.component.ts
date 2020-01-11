import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../core/services/auth.service';
import { UserModel } from '../models/user/user.model';
import { UserService } from '../core/services/user.service';
import { dashboardMenuConst } from './consts/dashboard-menu.const';
import { plainToClass } from 'class-transformer';
import { SocetService } from '../chat/services/socet.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  color = 'accent';
  checked = false;
  disabled = false;
  dashboardMenu = dashboardMenuConst;
  user: UserModel;
  constructor(
    private authService: AuthentificationService,
    private userService: UserService
  ) {
   }

  ngOnInit() {
    this.userService.getDashboardRes()
    .subscribe((res: any ) => {

    });

  }
  userExit = () => {
    this.authService.logOut();
  }

}
