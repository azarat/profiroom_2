import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePageComponent } from './components/service-page/service-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { ServicePageService } from './services/service-page.service';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { CategoriesHeaderModule } from '../shared/modules/categories-header/categories-header.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgxGalleryComponent } from './components/ngx-gallery/ngx-gallery.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AboutOfferComponent } from './components/about-offer/about-offer.component';
import { PackagesComponent } from './components/packages/packages.component';


const routes: Routes = [
  {
    path: '',
    component: ServicePageComponent
  }
];

@NgModule({
  declarations: [
    ServicePageComponent,
    NgxGalleryComponent,
    QuestionsComponent,
    AboutOfferComponent,
    PackagesComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    CategoriesHeaderModule,
    NgxGalleryModule
  ],
  exports: [
    ServicePageComponent,
  ],
  providers: [
    ServicePageService
  ]
})
export class ServicePageModule { }
