import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagerComponent } from './components/messager/messager.component';
import { CollocutorsListComponent } from './components/collocutors-list/collocutors-list.component';
import { MessagerToolsComponent } from './components/messager-tools/messager-tools.component';
import { ChatComponent } from './components/chat-component/chat-component';


//  socet module

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './services/chat.service';
const config: SocketIoConfig = { url: 'http://192.168.0.200:6001', options: {} }
//

@NgModule({
  declarations: [ChatComponent, MessagerToolsComponent, CollocutorsListComponent, MessagerComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [ChatComponent],
  providers: [
    ChatService
  ]
})
export class ChatModule { }
