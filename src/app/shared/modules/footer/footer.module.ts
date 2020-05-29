import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FooterComponent],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule,
    RouterModule,
    TranslateModule
  ]
})
export class FooterModule { }
