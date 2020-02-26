// import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
// import { getISOWeek } from 'date-fns';
// import { DatePipe } from '@angular/common';

// export class CustomDateFormatter extends CalendarDateFormatter {
//   public weekViewTitle({ date, locale }: DateFormatterParams): string {
//     const year: string = new DatePipe(locale).transform(date, 'y', locale);
//     const weekNumber: number = getISOWeek(date);
//     const shortDayOfWeek: string = new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date);
//     return `Semaine ${weekNumber} en ${year}`;

//     return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date);
//   }
// }
