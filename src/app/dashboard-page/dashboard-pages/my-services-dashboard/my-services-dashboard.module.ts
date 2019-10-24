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
  MatIconModule, MatTooltipModule, MatSelectModule, MatButtonModule, MatInputModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OfferCreationService } from './services/offer-creation.service';
import { DragDropDirective } from './directives/drag-drop.directive';
import { SecondStepCreationComponent } from './create-service/second-step-creation/second-step-creation.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FileClass } from './classes/file.class';


const servicesRoutes: Routes = [
  {
    path: '',
    component: MyServicesHomeComponent,
  },
  {
    path: 'create',
    component: CreateServiceComponent
  }
];

@NgModule({
  declarations: [
    MyServicesHomeComponent,
    CreateServiceComponent,
    FirstStepServiceCreationComponent,
    DragDropDirective,
    SecondStepCreationComponent
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
    NgbModule,
    MatSelectModule,
    CKEditorModule,
  ],
  exports: [

  ],
  providers: [
    OfferCreationService,
    FileClass
  ]
})
export class MyServicesDashboardModule { }
