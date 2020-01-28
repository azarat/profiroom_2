import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';

@Component({
  selector: 'app-birthday-user-settings',
  templateUrl: './birthday-user-settings.component.html',
  styleUrls: ['./birthday-user-settings.component.scss']
})
export class BirthdayUserSettingsComponent implements OnInit {
  days = [];
  mounth = [];
  // year: number = 1996;

  public maxDays: number;

  leapYear: boolean = false;

  @Input() userSettingsModel: UserSettingsModel;

  constructor() {}

  ngOnInit() {
    this.createArrayYear();
    this.filterChanhe();
    this.createDayArray();
    this.createMountArray();
  }

  createDayArray() {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
  }
  createMountArray() {
    for (let i = 1; i <= 12; i++) {
      this.mounth.push(i);
    }
  }

  createArrayYear() {
    let today = new Date();
    let year = today.getFullYear();
    const years = [];
    for (let i = 1980; i <= year - 8; i++) {
      years.push(i);
    }
    return years;
  }

  filterChanhe() {
    this._daysFilter();
  }

  private get userMonthBirdth() {
    return this.userSettingsModel.birthDay.month;
  }
  private get useYearBirdth() {
    return this.userSettingsModel.birthDay.year;
  }

  private _daysFilter() {
    if (
      this.userMonthBirdth === 4 ||
      this.userMonthBirdth === 6 ||
      this.userMonthBirdth === 9 ||
      this.userMonthBirdth === 11
    ) {
      return (this.maxDays = 30);
    } else if (
      Number(this.userMonthBirdth) === 2 &&
      Number(this.userSettingsModel.birthDay.year) % 4 === 0
    ) {
      return (this.maxDays = 29);
    } else if (
      Number(this.userMonthBirdth) === 2 &&
      Number(this.userSettingsModel.birthDay.year) % 4 !== 0
    ) {
      return (this.maxDays = 28);
    } else {
      return (this.maxDays = 31);
    }
  }
}
