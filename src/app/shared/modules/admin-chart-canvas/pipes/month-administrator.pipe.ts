import {
  Pipe,
  PipeTransform
} from '@angular/core';
import * as moment from 'moment';
import {
  monthConst
} from './month.const';

@Pipe({
  name: 'monthPipe'
})
export class MonthAdminPipe implements PipeTransform {

  month = monthConst;

  transform(value: number): any {

    return this.month.filter(el => {
      return el.num = value
    })[0].name;
  }

}
