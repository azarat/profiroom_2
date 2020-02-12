import * as moment from 'moment';

export function monthArrayConvert(arr: string[]) {
  const currentLang = moment().locale('ru');
  const monthArr = [];

  arr.forEach((element) => {
    monthArr.push(currentLang.localeData().monthsShort(moment(element)));
  });
  return monthArr;
}

