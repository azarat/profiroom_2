import { Component, OnInit } from '@angular/core';
import { DashboardSettingsModel } from 'src/app/models/dashboard-settings.model';

@Component({
  selector: 'app-user-settings-dashboard',
  templateUrl: './user-settings-dashboard.component.html',
  styleUrls: ['./user-settings-dashboard.component.scss']
})
export class UserSettingsDashboardComponent implements OnInit {

  public dashboardSettingsModel: DashboardSettingsModel;

  constructor() { }

  ngOnInit() {
  }

}
