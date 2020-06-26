import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframePaymentComponent, SafePipe } from './iframe-payment.component';



@NgModule({
  declarations: [
    IframePaymentComponent,
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IframePaymentComponent
  ]
})
export class IframePaymentModule { }
