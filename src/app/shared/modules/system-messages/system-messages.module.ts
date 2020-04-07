import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemMessagesComponent } from './system-messages.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [SystemMessagesComponent],
  exports: [
    SystemMessagesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SystemMessagesModule { }
