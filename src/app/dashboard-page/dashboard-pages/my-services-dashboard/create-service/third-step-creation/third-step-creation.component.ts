import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-third-step-creation',
  templateUrl: './third-step-creation.component.html',
  styleUrls: ['./third-step-creation.component.scss']
})
export class ThirdStepCreationComponent implements OnInit {
  packagesForm: FormGroup;


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.packagesForm = this.fb.group({
      name: null,
      mainOptions: this.fb.array([
      ])
    });

  }

  // --------- get optionsArray -----------------

  get mainOptionsArray() {
    return this.packagesForm.get('mainOptions') as FormArray;
  }

  // ----- add option to packages
  addMainOptin(item) {
    this.mainOptionsArray.push(this.fb.group(
      {
        title: null,
        basic: false,
        standart: false,
        premium: false
      }
    ));
  }

  deleteMainOption(index) {
    this.mainOptionsArray.removeAt(index);
  }

  saveStep() {
    console.log(this.packagesForm.value);
    // console.log(this.packagesForm.value.optionsArray = this.mainOptionsArray);
  }



  changesArrayCounter() {
    const changes = new Array();
    for (let i = 1; i <= 30; i++) {
      changes.push(i);
    }
    return changes;
  }
}
