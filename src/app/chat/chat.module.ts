import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat-component/chat-component';
import { ClickOutsideModule } from 'ng-click-outside';

//  socet module

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './services/chat.service';
import { CollocutorInformationComponent } from './components/collocutor-information/collocutor-information.component';
import { StarRatingModule } from '../shared/modules/star-rating/star-rating.module';
import { PickerModule } from 'node_modules/@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormatModule } from '../shared/pipes/data-format/data-format.module';
import { ShowUploadedFilesComponent } from './components/show-uploaded-files/show-uploaded-files.component';

import { EmojiComponent } from './components/emoji/emoji.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FileSizeModule } from '../shared/pipes/file-size/file-size.module';
import { FileTypeModule } from '../shared/pipes/file-type/file-type.module';

import { ChatErrorsComponent } from './components/chat-errors/chat-errors.component';
import { BriefMessageShowingComponent } from './components/brief-message-showing/brief-message-showing.component';
import { ThousandSeparatorModule } from '../shared/pipes/thousand-separator/thousand-separator.module';
import { SystemMessagesInDealsComponent } from './components/system-messages-in-deals/system-messages-in-deals.component';
import { LocalizeRouterModule } from 'localize-router';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageScrollService } from './services/message-scroll/message-scroll.service';
import { MessengerToolsComponent } from './components/messenger-tools/messenger-tools.component';
import { CollocutorListComponent } from './components/collocutors-list/collocutor-list.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { ProjectsFilterComponent } from './components/collocutors-list/projects-filter/projects-filter.component';
import { ProjectBriefFillingComponent } from './components/project-breef-filling/project-brief-filling.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { RateDealComponent } from './components/rate-deal/rate-deal.component';
import { DragDropModule } from '../shared/directives/drag-drop/drag-drop.module';
import { MakePaymentComponent } from './components/make-payment/make-payment.component';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
  // tslint:disable-next-line: no-angle-bracket-type-assertion
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL  }
  };
}

@NgModule({
  declarations: [
    ChatComponent,
    MessengerToolsComponent,
    CollocutorListComponent,
    MessageListComponent,
    CollocutorInformationComponent,
    ShowUploadedFilesComponent,
    EmojiComponent,
    UploadFileComponent,
    ProjectsFilterComponent,
    ProjectBriefFillingComponent,
    ChatErrorsComponent,
    BriefMessageShowingComponent,
    SystemMessagesInDealsComponent,
    RateDealComponent,
    ProjectBriefFillingComponent,
    MessengerComponent,
    MakePaymentComponent,

    // Directives

  ],
  imports: [
    CommonModule,
    RouterModule,
    StarRatingModule,
    PickerModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DragDropModule,

    DataFormatModule,
    FileSizeModule,
    FileTypeModule,

    // pipes
    ThousandSeparatorModule,

    // localize
    LocalizeRouterModule,
    TranslateModule

  ],
  exports: [
    ChatComponent,
    BriefMessageShowingComponent,
    SystemMessagesInDealsComponent,
  ],
  providers: [
    ChatService,
    MessageScrollService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig
    }
  ]
})
export class ChatModule {

 }

