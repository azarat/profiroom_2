import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileType'
})
export class FileTypePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return value.slice(value.indexOf('/') + 1);
  }

}
