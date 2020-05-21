import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { FormGroup, NgForm } from '@angular/forms';
// import { UserServiceModel } from 'src/app/models/user-service.model';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { filter } from 'rxjs/operators';
import { timer } from 'rxjs';
import cloneDeep from 'lodash/clonedeep';

@Component({
  selector: 'app-general-user-settings',
  templateUrl: './general-user-settings.component.html',
  styleUrls: ['./general-user-settings.component.scss']
})
export class GeneralUserSettingsComponent implements OnInit {

  @Input() userSettingsModel: UserSettingsModel;
  public mainSettingsFrom: FormGroup;
  public succesMessage = false;

  constructor(
    private userSettingsService: UserSettingsService,
  ) { }

  ngOnInit( ) { }

  updateSettings() {
    this.userSettingsService.updateService(this.userSettingsModel)
    .pipe(filter((res: any) => !!res))
    .subscribe(
      (res) => {
        // location.reload();
        this.userSettingsService.onloadUserModelCopy$.next(cloneDeep(this.userSettingsModel));
        this.succesMessage = true;
      }
    );

  }

  public closePopUp() {
    this.succesMessage = false;
  }
}
