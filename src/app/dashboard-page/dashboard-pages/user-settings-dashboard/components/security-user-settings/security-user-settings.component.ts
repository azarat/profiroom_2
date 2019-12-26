import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';

@Component({
  selector: 'app-security-user-settings',
  templateUrl: './security-user-settings.component.html',
  styleUrls: ['./security-user-settings.component.scss']
})

export class SecurityUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;

  constructor() { }

  ngOnInit() { }

}


