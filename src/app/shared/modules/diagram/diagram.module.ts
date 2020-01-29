import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramComponent } from './diagram.component';
import { ArrReverceModule } from '../../pipes/arr-reverse/arr-reverse.module';
import { ThousandSeparatorModule } from '../../pipes/thousand-separator/thousand-separator.module';
import { MonthPipeModule } from '../../pipes/month-pipe/month-pipe.module';



@NgModule({
  declarations: [DiagramComponent],
  imports: [
    CommonModule,
    ArrReverceModule,
    ThousandSeparatorModule,
    MonthPipeModule
  ],
  exports: [
    DiagramComponent,
  ]})

export class DiagramModule { }
