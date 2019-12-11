import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';

@Component({
  selector: 'app-additional-education-user-settings',
  templateUrl: './additional-education-user-settings.component.html',
  styleUrls: ['./additional-education-user-settings.component.scss']
})
export class AdditionalEducationUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;
  public mounth = [];

  constructor() { }

  ngOnInit() {
  }
  createMountArray() {
    for (let i = 1; i <= 12; i++) {
      this.mounth.push(i);
    }
  }
  createYearArray() {
    const years = [];
    for (let i = 1960; i <= 2019; i++) {
      years.push(i);
    }
    return years;
  }
}
