import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagerComponent } from './components/messager/messager.component';
import { CollocutorsListComponent } from './components/collocutors-list/collocutors-list.component';
import { MessagerToolsComponent } from './components/messager-tools/messager-tools.component';
import { ChatComponent } from './components/chat-component/chat-component';
import { ClickOutsideModule } from 'ng-click-outside';

//  socet module

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './services/chat.service';
import { MessageListComponent } from './components/message-list/message-list.component';
import { CollocutorInformationComponent } from './components/collocutor-information/collocutor-information.component';
import { StarRaitingModule } from '../shared/modules/star-raiting/star-raiting.module';
import { PickerModule } from 'node_modules/@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormatModule } from '../shared/pipes/data-format/data-format.module';
import { ShowUploadedFilesComponent } from './components/show-uploaded-files/show-uploaded-files.component';

// const jwtToken = (localStorage.token).replace('"', '');
// const config: SocketIoConfig = { url: 'http://192.168.0.200:6001', options: {query: {token: jwtToken}},  };
console.log('jwtToken');


@NgModule({
  declarations: [
    ChatComponent,
    MessagerToolsComponent,
    CollocutorsListComponent,
    MessagerComponent,
    MessageListComponent,
    CollocutorInformationComponent,
    ShowUploadedFilesComponent
  ],
  imports: [
    CommonModule,
    // SocketIoModule.forRoot(config),
    StarRaitingModule,
    PickerModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,

    DataFormatModule
  ],
  exports: [ChatComponent],
  providers: [
    ChatService
  ]
})
export class ChatModule {

 }

