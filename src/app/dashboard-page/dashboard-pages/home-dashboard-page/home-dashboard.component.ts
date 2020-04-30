import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { plainToClass } from 'class-transformer';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  user: UserModel;

  constructor(
    private userService: UserService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.defineCurrentUser();
    this.titleService.setTitle('Dashboard')
  }

  private defineCurrentUser() {
    this.userService.getDashboardRes()
      .subscribe((res: any) => {
        console.log(res);
        this.user = plainToClass(UserModel, res);
      });
  }
}
