import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { ChatModule } from '../chat/chat.module';
import { HomePageAdvantagesComponent } from './home-page-advantages/home-page-advantages.component';
import { HomePageSearchComponent } from './home-page-search/home-page-search.component';
import { HomePageHowWorkComponent } from './home-page-how-work/home-page-how-work.component';
import { HomePageFindSpecialistComponent } from './home-page-find-specialist/home-page-find-specialist.component';
import { HomePageQuestionsComponent } from './home-page-questions/home-page-questions.component';
import { MatExpansionModule } from '@angular/material/expansion';

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
    HomePageSearchComponent,
    HomePageHowWorkComponent,
    HomePageFindSpecialistComponent,
    HomePageQuestionsComponent
  ],
  exports: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    MatExpansionModule,
    ChatModule
  ]
})
export class HomePageModule { }
