import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinacePageComponent } from './finace-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { CalendarSharedModule } from 'src/app/shared/modules/calendar/calendar.module';
import { DiagramModule } from 'src/app/shared/modules/diagram/diagram.module';

const routes: Routes = [
  {
    path: '',
    component: FinacePageComponent,
  },
];

@NgModule({
  declarations: [FinacePageComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),

    CalendarSharedModule,
    DiagramModule
  ]
})
export class FinacePageModule { }
