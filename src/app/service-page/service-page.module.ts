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
import { ServicePageAnotherServicesComponent } from './components/service-page-another-services/service-page-another-services.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServicePageCompareTableComponent } from './components/service-page-compare-table/service-page-compare-table.component';
import { ServicePageSimilarOffersComponent } from './components/service-page-similar-offers/service-page-similar-offers.component';
import { UsersCommentsModule } from 'src/app/shared/modules/users-comments/users-comments.module';
import { MatCheckboxModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicePageCheckoutComponent } from './components/service-page-checkout/service-page-checkout.component';
import {
  TranslateModule
} from '@ngx-translate/core';
import { FooterModule } from '../shared/modules/footer/footer.module';

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
    ServicePageAnotherServicesComponent,
    ServicePageCompareTableComponent,
    ServicePageSimilarOffersComponent,
    ServicePageCheckoutComponent,
    // PackagesComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    CategoriesHeaderModule,
    NgxGalleryModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    UsersCommentsModule,
    TranslateModule,
    FooterModule
  ],
  exports: [
    ServicePageComponent,
  ],
  providers: [
    ServicePageService
  ]
})
export class ServicePageModule { }
