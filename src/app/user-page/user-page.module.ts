import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { CategoriesHeaderModule } from '../shared/modules/categories-header/categories-header.module';
import { UserDataService } from './service/user.service';
import { UserPageServicesComponent } from './user-page-services/user-page-services.component';
import { UserPageCommentsComponent } from './user-page-comments/user-page-comments.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserPageComponent,
  },
];


@NgModule({
  declarations: [UserPageComponent, UserPageServicesComponent, UserPageCommentsComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    CategoriesHeaderModule,
  ],
  providers: [
    UserDataService
  ]
})
export class UserPageModule { }
