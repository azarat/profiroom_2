import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './catalog-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';


const routes: Routes = [
  {
    path: '',
    component: CatalogPageComponent
  }
];

@NgModule({
  declarations: [
    CatalogPageComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),

    MainHeaderModule
  ],
  exports: [
    CatalogPageComponent
  ]
})
export class CatalogPageModule { }
