import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrReverceModule } from '../../pipes/arr-reverse/arr-reverse.module';
import { ThousandSeparatorModule } from '../../pipes/thousand-separator/thousand-separator.module';
import { MonthPipeModule } from '../../pipes/month-pipe/month-pipe.module';
import { AdminChartCanvasComponent } from './admin-chart-canvas.component';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [AdminChartCanvasComponent],
  imports: [
    CommonModule,
    ArrReverceModule,
    ThousandSeparatorModule,
    MonthPipeModule,
    ChartsModule
  ],
  exports: [
    AdminChartCanvasComponent,
  ]
})

export class AdminChartCanvasModule { }
