import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'monthPipe'
})
export class MonthPipePipe implements PipeTransform {

  transform(value: Date | moment.Moment, dateFormat: string): any {
    const lang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    const currentLang = moment().locale(lang);
    // tslint:disable-next-line: curly
    if ( dateFormat === 'MM' ) return currentLang.localeData().monthsShort(moment(value));
    // tslint:disable-next-line: curly
    if (dateFormat === 'MMMM') return currentLang.localeData().months(moment(value));

  }
}
