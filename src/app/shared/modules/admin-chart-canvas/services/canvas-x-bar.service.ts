import {
  Injectable
} from '@angular/core';
import * as moment from 'moment';
import { monthArrConst } from '../consts/monts-arr.const';


@Injectable({
  providedIn: 'root'
})
export class CanvasXbarService {

  public getMontDaysCount(month: number, year: number) {
    const maxDays: number = new Date(year, month, 0).getDate();
    return this._daysArrGenerator(maxDays);
  }

  private _daysArrGenerator(maxDays: number) {
    const daysArr = [];
    for (let i = 1; i <= maxDays; i++) {
      daysArr.push(i);
    }
    return daysArr;
  }

  public getHoursCount() {
    const hoursPerDay = 24;
    const time = [];
    for (let i = 0; i <= hoursPerDay; i++) { // fill in all of the hours
      if (i < 10) {
        time.push('0' + i);
      } else {
        time.push(i);
      }
    }
    return time;
  }

}
