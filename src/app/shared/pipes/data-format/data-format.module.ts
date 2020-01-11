import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './data-format.pipe';



@NgModule({
  declarations: [
    DateFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateFormatPipe
  ]
})
export class DataFormatModule { }
