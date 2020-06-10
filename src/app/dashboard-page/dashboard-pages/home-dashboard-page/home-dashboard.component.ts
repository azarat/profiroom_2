import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { plainToClass } from 'class-transformer';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  user: UserModel;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.setTitle();
    this.defineCurrentUser();
  }
  private setTitle() {
    this.translate.get('syte-title.dashboard')
      .pipe(first())
      .subscribe(res => {
        this.titleService.setTitle(res);
      });
  }
  private defineCurrentUser() {
    this.userService.getDashboardRes()
      .subscribe((res: any) => {
        console.log(res);
        this.user = plainToClass(UserModel, res);
      });
  }
}
