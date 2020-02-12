import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizeRouterModule } from 'localize-router';
import { routes } from 'src/app/app-routing.module';
import { RouterModule, Routes } from '@angular/router';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule,
  MatIconModule, MatTooltipModule, MatSelectModule, MatButtonModule,
  MatInputModule, MatChipsModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DragDropDirective } from './directives/drag-drop.directive';

import { FileClass } from './classes/file.class';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import { QuillModule } from 'ngx-quill';

import { NgKnifeModule } from 'ng-knife';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MyServicesHomeComponent } from './components/my-services-home/my-services-home.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
// import { ClickOutsideModule } from 'ng-click-outside';
// tslint:disable-next-line: max-line-length
import { FirstStepServiceCreationComponent } from './components/create-service/first-step-service-creation/first-step-service-creation.component';
import { SecondStepCreationComponent } from './components/create-service/second-step-creation/second-step-creation.component';
import { ThirdStepCreationComponent } from './components/create-service/third-step-creation/third-step-creation.component';
// tslint:disable-next-line: max-line-length
import { ThirdStepExtraOptionsComponent } from './components/create-service/third-step-creation/third-step-extra-options/third-step-extra-options.component';
import { FourthStepCreationComponent } from './components/create-service/fourth-step-creation/fourth-step-creation.component';
import { FifthStepCreationComponent } from './components/create-service/fifth-step-creation/fifth-step-creation.component';
import { LastStepCreationComponent } from './components/create-service/last-step-creation/last-step-creation.component';


const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


const servicesRoutes: Routes = [
  {
    path: '',
    component: MyServicesHomeComponent,
  },
  {
    path: 'create',
    component: CreateServiceComponent,
  }
];

@NgModule({
  declarations: [
    MyServicesHomeComponent,
    CreateServiceComponent,
    FirstStepServiceCreationComponent,
    DragDropDirective,
    SecondStepCreationComponent,
    ThirdStepCreationComponent,
    ThirdStepExtraOptionsComponent,
    FourthStepCreationComponent,
    FifthStepCreationComponent,
    LastStepCreationComponent
  ],
  imports: [
    // ---- angular
    CommonModule,
    LocalizeRouterModule.forChild(servicesRoutes),
    RouterModule.forChild(servicesRoutes),
    FormsModule,
    ReactiveFormsModule,

    // ---- loaded
    NgbModule,
    HighlightJsModule,
    QuillModule.forRoot(),
    NgKnifeModule,
    NgxMaskModule.forRoot(options),

    // -----matherials
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    MatTabsModule
  ],
  exports: [

  ],
  providers: [
    FileClass
  ]
})
export class MyServicesDashboardModule { }
