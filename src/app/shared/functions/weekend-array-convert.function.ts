import * as moment from 'moment';

export function weekendArrayConvertFunction(arr: string[]) {
  const language = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
  const currentLang = moment().locale(language);
  const weekendArr = [];

  arr.forEach((element) => {
    // console.log(currentLang.localeData().weekdaysShort(moment(element)))
    weekendArr.push(currentLang.localeData().weekdaysShort(moment(element)));
  });
  return weekendArr;
}




