import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value < 1000) {
      return value
    }
    return (Math.round((value.toFixed(0)) / 100 ) * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
