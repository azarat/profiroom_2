import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'monthPipe'
})
export class MonthPipePipe implements PipeTransform {

  transform(value: Date | moment.Moment, dateFormat: string): any {
    const lang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    const currentLang = moment().locale(lang);
    if ( dateFormat === 'MM' ) {
      return currentLang.localeData().monthsShort(moment(value));
    } else if (dateFormat === 'MMMM') {
      return currentLang.localeData().months(moment(value));
    }
  }
}
