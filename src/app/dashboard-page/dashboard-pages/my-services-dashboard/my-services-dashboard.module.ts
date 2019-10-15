import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizeRouterModule } from 'localize-router';
import { routes } from 'src/app/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MyServicesHomeComponent } from './my-services-home/my-services-home.component';
import { CreateServiceComponent } from './create-service/create-service.component';

const servicesRoutes: Routes = [
  {
    path: '',
    component: MyServicesHomeComponent,
  },
  {
    path: 'create',
    component: CreateServiceComponent
  }
];

@NgModule({
  declarations: [
    MyServicesHomeComponent,
    CreateServiceComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(servicesRoutes),
    RouterModule.forChild(servicesRoutes),
  ],
  exports: [

  ],
  providers: [
  ]
})
export class MyServicesDashboardModule { }
