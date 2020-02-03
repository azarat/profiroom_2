import { format, formatDistance, formatRelative, subDays, isDate, parse } from 'date-fns';
import { ru, uk, enUS } from 'date-fns/locale';
import { differenceInDays } from 'date-fns';


export function formatDataFunction(date: string, dataType: string) {
  const currentDate: Date = new Date();
  const messageDate = new Date(date);
  const deifferenceinDays = differenceInDays( currentDate, messageDate);

  if (deifferenceinDays === 0) {
    return format(new Date(messageDate), 'HH:mm');
  } else if (deifferenceinDays === 1) {
    return  'Вчера ' +  format(new Date(messageDate), 'HH:mm');
  } else {
    return format(new Date(messageDate), dataType);
  }
}
