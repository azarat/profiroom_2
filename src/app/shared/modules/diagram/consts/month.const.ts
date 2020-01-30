import * as moment from 'moment';

export const monthConst = () => {
  const months = [];
  const dateStart = moment();
  const dateEnd = moment().add(12, 'month');

  while (dateEnd.diff(dateStart, 'months') >= 0) {
    months.push(dateStart.format('M'))
    dateStart.add(1, 'month');
   }
  return months;

}

