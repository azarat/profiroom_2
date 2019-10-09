import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../core/services/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  color = 'accent';
  checked = false;
  disabled = false;

  user: User;
  constructor(
    private authService: AuthentificationService,
    private userService: UserService
  ) {
   }

  ngOnInit() {

  }
  userExit = () => {
    this.authService.logOut();
  }

}
