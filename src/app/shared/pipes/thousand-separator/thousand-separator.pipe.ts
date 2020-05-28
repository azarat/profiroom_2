import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: any, arg: string): any {
    if (arg === 'space') {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    if (value < 100000 && arg === 'all') {
      return value;
    }
    return (Math.round((value.toFixed(0)) / 100 ) * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
