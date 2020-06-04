import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './language.component';
import {ClickOutsideModule} from 'ng-click-outside';



@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    ClickOutsideModule,
  ],
  exports: [
    LanguageComponent
  ]
})
export class LanguageModule { }
