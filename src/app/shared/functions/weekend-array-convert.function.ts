import * as moment from 'moment';

export function weekendArrayConvertFunction(arr: string[]) {
  const currentLang = moment().locale('ru');
  const weekendArr = [];

  arr.forEach((element) => {
    // console.log(currentLang.localeData().weekdaysShort(moment(element)))
    weekendArr.push(currentLang.localeData().weekdaysShort(moment(element)));
  });
  return weekendArr;
}




