import { Pipe, PipeTransform } from '@angular/core';
import { monthConst } from './month.const';

@Pipe({
  name: 'adminMonth'
})
export class AdminMonthPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const month = monthConst;
    return month.filter(el => {
      return el.num === value;
    })[0].name;
  }

}
