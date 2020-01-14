import { Component, OnInit } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'app-user-settings-dashboard',
  templateUrl: './home-user-settings.component.html',
  styleUrls: ['./home-user-settings.component.scss']
})
export class HomeUserSettingsComponent implements OnInit {

  public userSettingsModel: UserSettingsModel = null;

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private userSettingsService: UserSettingsService,
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
    this.userSettingsService.getServiceData()
      .pipe(
        filter((response: any) => !!response)
      )
      .subscribe(response => {

        this.userSettingsModel = plainToClass(UserSettingsModel, response);
        console.log(this.userSettingsModel);
      });

  }

}
