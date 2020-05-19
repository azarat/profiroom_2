import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformPopupComponent } from './inform-popup.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [InformPopupComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    InformPopupComponent
  ]
})
export class InformPopupModule { }
