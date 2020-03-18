import { Pipe, PipeTransform } from '@angular/core';
import { monthConst } from './month.const';

@Pipe({
  name: 'monthAdmin'
})
export class MonthAdminPipe implements PipeTransform {

  transform(value: any): any {
    let month = monthConst;
    return month.filter(el => {
      return el.num = value
    })[0].name;
  }

}
