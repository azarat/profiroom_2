import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';

@Component({
  selector: 'app-notifications-user-settings',
  templateUrl: './notifications-user-settings.component.html',
  styleUrls: ['./notifications-user-settings.component.scss']
})
export class NotificationsUserSettingsComponent implements OnInit {
  @Input() userSettingsModel: UserSettingsModel;
  constructor() { }

  ngOnInit() {
  }

}
