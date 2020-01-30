import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import localeRu from '@angular/common/locales/ru';
import localeUk from '@angular/common/locales/uk';

registerLocaleData(localeRu);
registerLocaleData(localeUk);


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    CalendarModule
  ],
exports: [
  CalendarComponent
],

})

export class CalendarSharedModule { }
