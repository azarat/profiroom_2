import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminMonth'
})
export class AdminMonthPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
