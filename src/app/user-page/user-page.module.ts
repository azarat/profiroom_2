import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MainHeaderModule } from '../shared/modules/main-header/main-header.module';
import { CategoriesHeaderModule } from '../shared/modules/categories-header/categories-header.module';
import { UsersCommentsModule } from 'src/app/shared/modules/users-comments/users-comments.module';
import { UserDataService } from './service/user.service';
import { UserPageServicesComponent } from './user-page-services/user-page-services.component';
import {
  TranslateModule
} from '@ngx-translate/core';

import { MatTabsModule} from '@angular/material';
import { DataFormatModule } from '../shared/pipes/data-format/data-format.module';
import { FooterModule } from '../shared/modules/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserPageComponent,
  },
];


@NgModule({

  declarations: [UserPageComponent, UserPageServicesComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    MainHeaderModule,
    CategoriesHeaderModule,
    UsersCommentsModule,
    DataFormatModule,
    TranslateModule,
    FooterModule,
    // -----material's
    MatTabsModule
  ],
  providers: [
    UserDataService
  ]
})
export class UserPageModule { }
