import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.currentUser$
    .subscribe(res => {
      console.log(res);
      this.user = res;
    });
   }

  ngOnInit() {
    this.userService.getDashboardRes()
    .subscribe((res: any) => {
      this.authService.setUserData(res.user);
    });
  }

}
