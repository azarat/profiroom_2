import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsPageComponent } from './projects-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { ChatModule } from 'src/app/chat/chat.module';

const dashboardPageRoutes: Routes = [
  {
    path: '',
    pathMatch:'full',
    component: ProjectsPageComponent,
  }
];

@NgModule({
  declarations: [ProjectsPageComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(dashboardPageRoutes),
    RouterModule.forChild(dashboardPageRoutes),
    ChatModule
  ]
})
export class ProjectsPageModule { }
