import { Pipe, PipeTransform } from '@angular/core';
import { formatDataFunction } from '../../functions/format-data.function';

@Pipe({
  name: 'dateFormatPipe',
})

export class DateFormatPipe implements PipeTransform {


  transform(value: string) {
    return formatDataFunction(value);
  }

}
