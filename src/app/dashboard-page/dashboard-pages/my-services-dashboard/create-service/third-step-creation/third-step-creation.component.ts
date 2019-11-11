import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-third-step-creation',
  templateUrl: './third-step-creation.component.html',
  styleUrls: ['./third-step-creation.component.scss']
})
export class ThirdStepCreationComponent implements OnInit {
  packagesForm: FormGroup;

  showPackages = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.packagesForm = this.fb.group({
      allPackages: null,
      name: null,
      basicChanges: null,
      classicChanges: null,
      premiumChanges: null,
      mainOptions: this.fb.array([
      ]),
      basicCompressTime: null,
      basicCompressPrice: null,
      // basicTime: {
      //   time: null,
      //   price: null
      // },
      // standartTime: {
      //   time: null,
      //   price: null
      // },
      // premiumTime: {
      //   time: null,
      //   price: null
      // },
      extraOptions: this.fb.array([
        {
          title: 'pertime',
          package: 'basic',
          activated: false,
          time: null,
          price: null
        },
        {
          title: 'pertime',
          package: 'standart',
          activated: false,
          time: null,
          price: null
        },
        {
          title: 'pertime',
          package: 'premium',
          activated: false,
          time: null,
          price: null
        }
      ])
    });
    
    console.log(this.useAllPackages)
  }

  changesArrayCounter() {
    const changes = new Array();
    for (let i = 1; i <= 30; i++) {
      changes.push(i);
    }
    return changes;
  }

  // --------- get main  optionsArray -----------------

  get mainOptionsArray() {
    return this.packagesForm.get('mainOptions') as FormArray;
  }

  // ----- add option to main packages
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

  // saveStep() {
  //   // console.log(this.packagesForm.value);
  //   // console.log(this.packagesForm.value.optionsArray = this.mainOptionsArray);
  // }





  get useAllPackages (){
    // console.log(this.packagesForm.get('allPackages').value)
    return this.packagesForm.get('allPackages').value;
  }


  openAllPackages() {
    this.packagesForm.controls['allPackages'].setValue(true);
  }

  changePackageAmount(e: boolean){
    this.showPackages = e;
  }



// *********************** Extra optins functions *******************// 

  // ----- get extra optionsArray -------------------

  get extraOptionsArray() {
    return this.packagesForm.get('extraOptions') as FormArray;
  }

  addExtraOptin(item) {
    this.mainOptionsArray.push(this.fb.group(
      {
        title: null,
        description: null,
        price: null,
        perTime: null
      }
    ));
  }
}
