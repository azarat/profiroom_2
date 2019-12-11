import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';

@Component({
  selector: 'app-education-user-settings',
  templateUrl: './education-user-settings.component.html',
  styleUrls: ['./education-user-settings.component.scss']
})
export class EducationUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;

  // public academicDegrees = [
  //   'Молодший спеціаліст',
  //   'Бакалавр',
  //   'Спеціаліст',
  //   'Магістр'
  // ];

  public academicDegrees = [
    1, 2, 3, 4, 5
  ];

  constructor() { }

  ngOnInit() {
  }

  createYears() {
    const years = [];
    for (let i = 1960; i <= 2019; i++) {
      years.push(i);
    }
    return years;
  }

}
