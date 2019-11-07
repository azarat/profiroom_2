import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizeRouterModule } from 'localize-router';
import { routes } from 'src/app/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MyServicesHomeComponent } from './my-services-home/my-services-home.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { FirstStepServiceCreationComponent } from './create-service/first-step-service-creation/first-step-service-creation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule,
  MatIconModule, MatTooltipModule, MatSelectModule, MatButtonModule, MatInputModule, MatChipsModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DragDropDirective } from './directives/drag-drop.directive';
import { SecondStepCreationComponent } from './create-service/second-step-creation/second-step-creation.component';
import { FileClass } from './classes/file.class';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import { QuillModule } from 'ngx-quill';
import { ThirdStepCreationComponent } from './create-service/third-step-creation/third-step-creation.component';
import { NgKnifeModule } from 'ng-knife';
import { NgxMaskModule, IConfig } from 'ngx-mask';


export let options: Partial<IConfig> | (() => Partial<IConfig>);


const servicesRoutes: Routes = [
  {
    path: '',
    component: MyServicesHomeComponent,
  },
  {
    path: 'create',
    component: CreateServiceComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: FirstStepServiceCreationComponent
  //     },
  //     {
  //       path: 'second-step',
  //       component: SecondStepCreationComponent
  //     }
  // ]
  }
];

@NgModule({
  declarations: [
    MyServicesHomeComponent,
    CreateServiceComponent,
    FirstStepServiceCreationComponent,
    DragDropDirective,
    SecondStepCreationComponent,
    ThirdStepCreationComponent
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(servicesRoutes),
    RouterModule.forChild(servicesRoutes),

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    NgbModule,
    MatSelectModule,
    HighlightJsModule,
    QuillModule.forRoot(),
    NgKnifeModule,
    NgxMaskModule.forRoot(options)
  ],
  exports: [

  ],
  providers: [
    FileClass
  ]
})
export class MyServicesDashboardModule { }
