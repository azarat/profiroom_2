import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentHistoryComponent } from './payment-history.component';
import { DataFormatModule } from '../../pipes/data-format/data-format.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [PaymentHistoryComponent],
  imports: [
    CommonModule,
    DataFormatModule,
    TranslateModule
  ],
  exports: [
    PaymentHistoryComponent
  ]
})
export class PaymentHistoryModule { }
