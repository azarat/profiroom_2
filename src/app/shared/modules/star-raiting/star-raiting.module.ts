import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRaitingComponent } from './star-raiting.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    StarRaitingComponent,
  ],
  exports: [
    StarRaitingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule

  ]
})
export class StarRaitingModule { }
