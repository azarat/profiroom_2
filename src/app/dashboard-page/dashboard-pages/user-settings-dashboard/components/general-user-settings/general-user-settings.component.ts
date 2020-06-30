import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { FormGroup, NgForm } from '@angular/forms';
// import { UserServiceModel } from 'src/app/models/user-service.model';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { filter } from 'rxjs/operators';
import { timer } from 'rxjs';
import cloneDeep from 'lodash/clonedeep';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-general-user-settings',
  templateUrl: './general-user-settings.component.html',
  styleUrls: ['./general-user-settings.component.scss']
})
export class GeneralUserSettingsComponent implements OnInit {

  @Input() userSettingsModel: UserSettingsModel;
  public mainSettingsFrom: FormGroup;
  public succesRessult = false;
  public popUpStatus = null;
  public submitted: boolean = null;

  constructor(
    private userSettingsService: UserSettingsService,
    private userService: UserService
  ) { }

  ngOnInit( ) { }

  updateSettings() {
    this.submitted = true;
    if (this.userSettingsModel.language.length == 1 && (this.userSettingsModel.language[0].langName === null )) {
      this.userSettingsModel.language = [];
    }
    this.userSettingsService.updateService(this.userSettingsModel)
    .pipe(filter((res: any) => !!res))
    .subscribe(
      (res) => {
        // location.reload();
        this.userSettingsService.onloadUserModelCopy$.next(cloneDeep(this.userSettingsModel));
        this.succesRessult = true;
        this.userService.getMinUserData();
        this.popUpStatus = true;
        timer(5000)
        .subscribe(time => {
          this.togglePopUp();
        });
      }
    );

  }

  public togglePopUp() {
    this.popUpStatus = null;
    this.succesRessult = true;
  }


}
