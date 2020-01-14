import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { FormGroup, NgForm } from '@angular/forms';
// import { UserServiceModel } from 'src/app/models/user-service.model';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-general-user-settings',
  templateUrl: './general-user-settings.component.html',
  styleUrls: ['./general-user-settings.component.scss']
})
export class GeneralUserSettingsComponent implements OnInit {

  @Input() userSettingsModel: UserSettingsModel;
  public mainSettingsFrom: FormGroup;

  constructor(
    private userSettingsService: UserSettingsService,
  ) { }



  ngOnInit(

  ) {

  }
  updateSettings() {
    console.log(this.userSettingsModel);
    this.userSettingsService.updateService(this.userSettingsModel)
    .pipe(filter((res: any) => !!res))
    .subscribe(
      (res) => {
        console.log(this.userSettingsModel);
        // this.userSettingsModel = res;
        console.log(res);
      }
    );
  }
}
