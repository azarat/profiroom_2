import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../core/services/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../core/services/user.service';
import { dashboardMenuConst } from './consts/dashboard-menu.const';

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
