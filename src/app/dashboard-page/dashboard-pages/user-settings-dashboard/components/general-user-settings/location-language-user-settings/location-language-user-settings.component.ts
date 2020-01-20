import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';

@Component({
  selector: 'app-location-language-user-settings',
  templateUrl: './location-language-user-settings.component.html',
  styleUrls: ['./location-language-user-settings.component.scss']
})
export class LocationLanguageUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;

  public languagesLevel = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {
    // console.log(this.userSettings.languages);
  }
  deleteMainOption(index: number) {
    this.userSettings.removeLanguage(index);
  }
  addLanguage() {
    this.userSettings.language.push(
      {
        langName: null,
        langLevel: null
      }
    );
  }
}