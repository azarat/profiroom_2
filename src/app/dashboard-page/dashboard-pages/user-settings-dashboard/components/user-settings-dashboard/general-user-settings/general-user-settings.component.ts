import { Component, OnInit, Input } from '@angular/core';
import { UserDashboardSettingsService } from '../../../services/user-dashboard-settings.service';
import { FormGroup, NgForm } from '@angular/forms';
// import { UserServiceModel } from 'src/app/models/user-service.model';
import { DashboardSettingsModel } from 'src/app/models/dashboard-settings.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-general-user-settings',
  templateUrl: './general-user-settings.component.html',
  styleUrls: ['./general-user-settings.component.scss']
})
export class GeneralUserSettingsComponent implements OnInit {

  public mainSettingsFrom: FormGroup;

  avaUrl: string;
  file: any

  constructor(
    private userDashboardSettingsService: UserDashboardSettingsService,
  ) { }

  @Input() dashboardSettings: DashboardSettingsModel;

  ngOnInit() {
  }

  avatarUpload = (event: any) => {

    const formData: FormData = new FormData();
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    formData.append('avatar', this.file);

    console.log(formData);
    this.userDashboardSettingsService.uploadFiles(formData)
    .pipe(filter((res: any) => !!res))
    .subscribe((res) => {
      // console.log(res)
      this.dashboardSettings.avatar = res;
    });
  }
}
