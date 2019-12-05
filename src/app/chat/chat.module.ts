import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagerComponent } from './components/messager/messager.component';
import { CollocutorsListComponent } from './components/collocutors-list/collocutors-list.component';
import { MessagerToolsComponent } from './components/messager-tools/messager-tools.component';
import { ChatComponent } from './components/chat-component/chat-component';


//  socet module

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} }
//

@NgModule({
  declarations: [ChatComponent, MessagerToolsComponent, CollocutorsListComponent, MessagerComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [ChatComponent]
})
export class ChatModule { }
