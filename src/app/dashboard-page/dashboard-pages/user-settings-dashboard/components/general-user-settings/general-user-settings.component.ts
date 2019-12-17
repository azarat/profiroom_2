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

  public mainSettingsFrom: FormGroup;

  constructor(
    private userSettingsService: UserSettingsService,
  ) { }

  @Input() userSettingsModel: UserSettingsModel;

  ngOnInit() {
  }

  public updateSettings() {
    this.userSettingsService.updateService(this.userSettingsModel)
  }
}
