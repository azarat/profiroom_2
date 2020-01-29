import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'monthPipe'
})
export class MonthPipePipe implements PipeTransform {

  transform(value: Date | moment.Moment, dateFormat: string): any {
    let fr = moment().locale('ru');
    return fr.localeData().monthsShort(moment(value));
}

}
