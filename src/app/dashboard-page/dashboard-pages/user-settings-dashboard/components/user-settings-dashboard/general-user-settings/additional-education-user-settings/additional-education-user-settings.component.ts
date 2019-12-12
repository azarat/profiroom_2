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
    this.createMountArray();
    // this.createYearArray();
  }
  createMountArray() {
    for (let i = 1; i <= 12; i++) {
      this.mounth.push(i);
    }
  }
  createYearArray() {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 1960; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  }

  addEducation() {
    this.userSettings.additionalEducation.push({
      additionalInstitution: null,
      courseName: null,
      startStudyMounth: null,
      startStudyYear: null,
      endStudyMounth: null,
      endStudyYear: null,
      additionalDiplomaFiles: null
    });
  }

  deleteEducation(index: number) {
    this.userSettings.deleteAdditionalEducation(index);
  }
}
