import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    StarRatingComponent,
  ],
  exports: [
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule

  ]
})
export class StarRatingModule { }
