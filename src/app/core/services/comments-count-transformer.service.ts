import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommetnsCountTransformerService {

  public transformCommentsVlalue(num: number) {
    if (num < 1000) {
      return num;
    } else {
      const exp = Math.floor(Math.log(num) / Math.log(1000));
      const suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];
      return (num / Math.pow(1000, exp)).toFixed(1) + suffixes[exp - 1] + '+';
    }
  }
}
