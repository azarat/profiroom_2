import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMonthPipe } from './admin-month.pipe';



@NgModule({
  declarations: [AdminMonthPipe],
  imports: [
    CommonModule
  ],
  exports: [
    AdminMonthPipe
  ]
})
export class AdminMonthModule { }
