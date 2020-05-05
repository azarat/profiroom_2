import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { ChatModule } from '../chat/chat.module';
import { HomePageAdvantagesComponent } from './home-page-advantages/home-page-advantages.component';
import { HomePageSearchComponent } from './home-page-search/home-page-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];


@NgModule({
  declarations: [
    HomePageComponent,
    HomePageAdvantagesComponent,
    HomePageSearchComponent
  ],
  exports: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,

    ChatModule
  ]
})
export class HomePageModule { }
