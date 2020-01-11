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
  user: User;
  constructor(
    private authService: AuthentificationService,
    private userService: UserService,
    private socetService: SocetService

  ) {
   }

  ngOnInit() {
    this.userService.getDashboardRes()
    .subscribe((res: any ) => {
      console.log(res);
      this.user = plainToClass(UserModel, res[0]);
      this.authService.saveUserId(this.user.id);
    });

    this.socetService.connect();

  }
  userExit = () => {
    this.authService.logOut();
  }

}
