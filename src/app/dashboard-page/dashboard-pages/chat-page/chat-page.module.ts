import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { ChatModule } from 'src/app/chat/chat.module';
import { ChatPageComponent } from './components/chat-page/chat-page.component';


const servicesRoutes: Routes = [
  {
    path: '',
    pathMatch:'full',
    component: ChatPageComponent,
  }
];

@NgModule({
  declarations: [ChatPageComponent, ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(servicesRoutes),
    RouterModule.forChild(servicesRoutes),
    ChatModule
  ]
})
export class ChatPageModule { }
