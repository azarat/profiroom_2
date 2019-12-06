import { Component, OnInit } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDashboardSettingsService } from '../../services/user-dashboard-settings.service';

@Component({
  selector: 'app-user-settings-dashboard',
  templateUrl: './user-settings-dashboard.component.html',
  styleUrls: ['./user-settings-dashboard.component.scss']
})
export class UserSettingsDashboardComponent implements OnInit {

  public userSettingsModel: UserSettingsModel ;

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private userDashboardSettingsService: UserDashboardSettingsService,
  ) { }

  ngOnInit() {
    this.getUserService();
  }

  //  ** load userServiceData from server
  getUserService() {
    let request: object;
    if (this._route.snapshot.queryParams.offerId) {
      request = this._route.snapshot.queryParams;
    }
    this.userDashboardSettingsService.getServiceData()
      .pipe(
        filter((response: any) => !!response)
      )
      .subscribe(response => {

        this.userSettingsModel = plainToClass(UserSettingsModel, response);
        // console.log(this.userSettingsModel)
      });

  }

}
