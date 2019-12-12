import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    ClickOutsideDirective
  ],
  exports: [
    ClickOutsideDirective
  ]
})

export class ClickOutsideDirective {

}
