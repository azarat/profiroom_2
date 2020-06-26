import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsService } from '../../../services/user-settings.service';
import { FormGroup, NgForm } from '@angular/forms';
// import { UserServiceModel } from 'src/app/models/user-service.model';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-user-settings',
  templateUrl: './main-user-settings.component.html',
  styleUrls: ['./main-user-settings.component.scss']
})
export class MainUserSettingsComponent implements OnInit {

  public mainSettingsFrom: FormGroup;
  avaUrl: string;
  file: any;

  // public unamePattern = "^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ'-\s ]{3,15}$";
  public unamePattern = "^([А-ЯЁЇІЄҐ]{1}[а-яёїієґ]{3,15})|([A-Z]{1}[a-z]{29})$";

  constructor(
    private userSettingsService: UserSettingsService,
  ) { }

  @Input() userSettingsModel: UserSettingsModel;

  ngOnInit() { }

  avatarUpload = (event: any) => {

    const formData: FormData = new FormData();
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    formData.append('avatar', this.file);

    this.userSettingsService.uploadFiles(formData)
      .pipe(filter((res: any) => !!res))
      .subscribe((res: any) => {
        this.userSettingsModel.avatar = res.avatar;
      });
  }
  public showStatus() {
    console.log(this.mainSettingsFrom.controls);
  }
}
