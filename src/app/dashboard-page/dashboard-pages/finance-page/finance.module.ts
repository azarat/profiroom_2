import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { CalendarSharedModule } from 'src/app/shared/modules/calendar/calendar.module';
import { DiagramModule } from 'src/app/shared/modules/diagram/diagram.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormatModule } from 'src/app/shared/pipes/data-format/data-format.module';
import { ThousandSeparatorModule } from 'src/app/shared/pipes/thousand-separator/thousand-separator.module';
import { AdminChartCanvasModule } from 'src/app/shared/modules/admin-chart-canvas/admin-chart-canvas.module';
import { UserFinancesComponent } from './components/user-finances/user-finances.component';
import { AdminFinancesComponent } from './components/admin-finances/admin-finances.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { FinancePageComponent } from './finance-page.component';

const routes: Routes = [
  {
    path: '',
    component: FinancePageComponent,
  },
];

@NgModule({
  declarations: [FinancePageComponent, UserFinancesComponent, AdminFinancesComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),

    CalendarSharedModule,
    DiagramModule,
    AdminChartCanvasModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,

    // Pipes
    DataFormatModule,
    ThousandSeparatorModule,

    // directives
    ClickOutsideModule
  ]
})
export class FinancePageModule { }
