import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrReversePipe } from './arr-reverse.pipe';



@NgModule({
  declarations: [
    ArrReversePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArrReversePipe
  ]
})
export class ArrReverceModule { }
