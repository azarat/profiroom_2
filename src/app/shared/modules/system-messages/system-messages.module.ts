import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemMessagesComponent } from './system-messages.component';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from 'src/app/chat/services/chat.service';
import { SocketService } from 'src/app/chat/services/socket.service';



@NgModule({
  declarations: [SystemMessagesComponent],
  exports: [
    SystemMessagesComponent
    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    
  ],
  providers: [
    ChatService,
    SocketService
  ]
})
export class SystemMessagesModule { }
