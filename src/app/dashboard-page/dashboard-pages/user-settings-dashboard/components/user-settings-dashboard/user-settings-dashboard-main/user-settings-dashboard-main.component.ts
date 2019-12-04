import { Component, OnInit, Input } from '@angular/core';
import { UserDashboardSettingsService } from '../../../services/user-dashboard-settings.service';
import { FormGroup, NgForm } from '@angular/forms';
// import { UserServiceModel } from 'src/app/models/user-service.model';
import { DashboardSettingsModel } from 'src/app/models/dashboard-settings.model';

@Component({
  selector: 'app-user-settings-dashboard-main',
  templateUrl: './user-settings-dashboard-main.component.html',
  styleUrls: ['./user-settings-dashboard-main.component.scss']
})
export class UserSettingsDashboardMainComponent implements OnInit {

  public mainSettingsFrom: FormGroup;
  avaUrl: any;
  file: any

  constructor(
    private userDashboardSettingsService: UserDashboardSettingsService,
  ) { }

  @Input() dashboardSettingsModel: DashboardSettingsModel;

  ngOnInit() {
  }

  avatarUpload = (event: any) => {

    // let target = event.target || event.srcElement;
    // this.file = target.file;

    const data: FormData = new FormData();
    let arr = [];

    arr.push(event.files[0]);

    console.log(event.files[0]);
    this.userDashboardSettingsService.uploadFiles(arr)
    .subscribe((res) => {
      this.avaUrl = res;
    });
  }
}
