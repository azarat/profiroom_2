import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemMessagesComponent } from './system-messages.component';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from 'src/app/chat/services/chat.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { DataFormatModule } from '../../pipes/data-format/data-format.module';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [SystemMessagesComponent],
  exports: [
    SystemMessagesComponent
    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ClickOutsideModule,
    DataFormatModule,
    LocalizeRouterModule,
    TranslateModule
  ],
  providers: [
    ChatService,
    SocketService
  ]
})
export class SystemMessagesModule { }
