import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';

@Component({
  selector: 'app-location-language-user-settings',
  templateUrl: './location-language-user-settings.component.html',
  styleUrls: ['./location-language-user-settings.component.scss']
})
export class LocationLanguageUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;

  public unamePattern = "^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ'-()]{3,15}$";

  public languagesLevel = [1, 2, 3, 4, 5];
  public languageTranslates = [
    'general.language-lvl.1-lvl',
    'general.language-lvl.2-lvl',
    'general.language-lvl.3-lvl',
    'general.language-lvl.4-lvl',
    'general.language-lvl.5-lvl'
  ];

  constructor() { }

  ngOnInit() {
    this.createLAngFieldsIfAMpty();
  }

  deleteMainOption(index: number) {
    this.userSettings.removeLanguage(index);
  }
  addLanguage() {
    this.userSettings.language.push(
      {
        langName: null,
        langLevel: 1
      }
    );
  }
  private createLAngFieldsIfAMpty() {
    if(this.userSettings.language.length === 0 ) {
      let lang = {
        langName: null,
        langLevel: 1
      }
      this.userSettings.language.push(lang)
    
    }
  }
}
