import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArbitrationPageComponent } from './arbitration-page.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule, Routes } from '@angular/router';
import { DataFormatModule } from 'src/app/shared/pipes/data-format/data-format.module';
import { ChatModule } from 'src/app/chat/chat.module';
import { FileTypeModule } from 'src/app/shared/pipes/file-type/file-type.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const arbitrationRoute: Routes =[
  {
    path: '',
    component: ArbitrationPageComponent
  }
]

@NgModule({
  declarations: [ArbitrationPageComponent],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(arbitrationRoute),
    RouterModule.forChild(arbitrationRoute),
    DataFormatModule,
    ChatModule,
    FileTypeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArbitrationPageModule { }
