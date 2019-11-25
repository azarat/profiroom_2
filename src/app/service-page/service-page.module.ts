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
import { ServicePageQuestionsComponent } from './components/service-page-questions/service-page-questions.component';
import { ServicePageAboutOfferComponent } from './components/service-page-about-offer/service-page-about-offer.component';
import { ServicePagePackagesComponent } from './components/service-page-packages/service-page-packages.component';
// import { PackagesComponent } from './components/packages/packages.component';


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
    ServicePageQuestionsComponent,
    ServicePageAboutOfferComponent,
    ServicePagePackagesComponent,
    // PackagesComponent
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
