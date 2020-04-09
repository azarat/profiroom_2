import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrReverceModule } from '../../pipes/arr-reverse/arr-reverse.module';
import { ThousandSeparatorModule } from '../../pipes/thousand-separator/thousand-separator.module';
import { MonthPipeModule } from '../../pipes/month-pipe/month-pipe.module';
import { AdminChartCanvasComponent } from './admin-chart-canvas.component';

import { ChartsModule } from 'ng2-charts';
import { CalendarSharedModule } from '../calendar/calendar.module';
import { MounthChartSelectComponent } from './mounth-chart-select/mounth-chart-select.component';
import { AdminMonthModule } from '../../pipes/admin-month/admin-month.module';
import {DlDateTimePickerModule, DlDateTimeDateModule} from 'angular-bootstrap-datetimepicker';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminChartCanvasComponent,
    MounthChartSelectComponent,

    // pipe
  ],
  imports: [
    CommonModule,
    ArrReverceModule,
    ThousandSeparatorModule,
    MonthPipeModule,
    ChartsModule,
    CalendarSharedModule,
    AdminMonthModule,
    FormsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule
  ],
  exports: [
    AdminChartCanvasComponent,
  ]
})

export class AdminChartCanvasModule { }
