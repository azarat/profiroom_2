import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent
  }
];

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }
