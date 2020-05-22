import * as moment from 'moment';

export function monthArrayConvert(arr: string[]) {
  const language = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
  const currentLang = moment().locale(language);
  const monthArr = [];

  arr.forEach((element) => {
    monthArr.push(currentLang.localeData().monthsShort(moment(element)));
  });
  return monthArr;
}

