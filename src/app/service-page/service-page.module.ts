import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePageComponent } from './components/service-page/service-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { ServicePageService } from './services/service-page.service';

const routes: Routes = [
  {
    path: '',
    component: ServicePageComponent
  }
];

@NgModule({
  declarations: [ServicePageComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
  ],
  exports: [
    ServicePageComponent,
  ],
  providers: [
    ServicePageService
  ]
})
export class ServicePageModule { }
