import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinacePageComponent } from './finace-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { CalendarSharedModule } from 'src/app/shared/modules/calendar/calendar.module';
import { DiagramModule } from 'src/app/shared/modules/diagram/diagram.module';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormatModule } from 'src/app/shared/pipes/data-format/data-format.module';
import { ThousandSeparatorModule } from 'src/app/shared/pipes/thousand-separator/thousand-separator.module';

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
    DiagramModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,

    // Pipes
    DataFormatModule,
    ThousandSeparatorModule
  ]
})
export class FinacePageModule { }
