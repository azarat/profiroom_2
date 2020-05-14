import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentHistoryComponent } from './payment-history.component';
import { DataFormatModule } from '../../pipes/data-format/data-format.module';



@NgModule({
  declarations: [PaymentHistoryComponent],
  imports: [
    CommonModule,
    DataFormatModule
  ],
  exports: [
    PaymentHistoryComponent
  ]
})
export class PaymentHistoryModule { }
