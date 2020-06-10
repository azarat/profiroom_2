import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';

@Component({
  selector: 'app-birthday-user-settings',
  templateUrl: './birthday-user-settings.component.html',
  styleUrls: ['./birthday-user-settings.component.scss']
})
export class BirthdayUserSettingsComponent implements OnInit {
  days = [];
  month = [];

  public maxDays: number;

  @Input() userBirthDay: {day, month, year};

  constructor() {}

  ngOnInit() {
    this.createArrayYear();
    this.onFilterChanhe();
    this.createMontArray();
  }

  createMontArray() {
    this.month = new Array(12);
  }

  createArrayYear() {
    let year = new Date().getFullYear();

    const years = [];

    for (let i = 1980; i <= year - 8; i++) {
      years.push(i);
    }
    return years;
  }

  public onFilterChanhe() {
    this._daysFilter();
  }

  private _daysFilter() {
    console.log(this.userBirthDay);
    this.getMontDaysCount(this.userBirthDay.month + 1, this.userBirthDay.year);
  }

  private getMontDaysCount(month: number, year: number) {
    this.days = null;
    const maxDays: number = new Date(year, month, 0).getDate();
    this.days = new Array(maxDays);
  }

}
