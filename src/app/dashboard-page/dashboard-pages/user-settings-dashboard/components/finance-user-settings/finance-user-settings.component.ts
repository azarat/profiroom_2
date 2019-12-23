import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { filter } from 'rxjs/operators';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  selector: 'app-finance-user-settings',
  templateUrl: './finance-user-settings.component.html',
  styleUrls: ['./finance-user-settings.component.scss']
})
export class FinanceUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;
  public submited = false;

  constructor(
    private userSettingsService: UserSettingsService
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.submited = true;
    if (form.invalid) {
      console.log('invalid');
      return;
    }
  }

  updateSettings() {
    console.log(this.userSettings);
    this.userSettingsService.updateService(this.userSettings)
    .pipe(filter((res: any) => !!res))
    .subscribe(
      (res) => {
        console.log(res);
        this.userSettings = res;
      }
    );
  }

}
