import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-third-step-creation',
  templateUrl: './third-step-creation.component.html',
  styleUrls: ['./third-step-creation.component.scss']
})
export class ThirdStepCreationComponent implements OnInit {
  packagesForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  saveStep(){

  }
}
