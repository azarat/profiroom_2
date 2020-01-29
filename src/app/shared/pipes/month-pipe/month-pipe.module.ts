import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthPipePipe } from './month-pipe.pipe';



@NgModule({
  declarations: [MonthPipePipe],
  imports: [
    CommonModule
  ],
   exports: [
    MonthPipePipe
   ]
})
export class MonthPipeModule { }
