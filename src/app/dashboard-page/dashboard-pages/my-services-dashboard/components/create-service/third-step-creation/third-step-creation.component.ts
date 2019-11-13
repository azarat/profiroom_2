import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';

import { trigger, state, style, animate, transition, } from '@angular/animations';

@Component({
  selector: 'app-third-step-creation',
  templateUrl: './third-step-creation.component.html',
  styleUrls: ['./third-step-creation.component.scss'],
})
export class ThirdStepCreationComponent implements OnInit {
  packagesForm: FormGroup;
  user
  showPackages = false;
  optionsVisible = false;
  width = '300px'
  constructor(
    private fb: FormBuilder
  ) { }

  @Input() userService: UserServiceModel;
  @Output() public setCurrentStep = new EventEmitter();

  ngOnInit() {
    this.packagesForm = this.fb.group({
      allPackages: false,
      packagesTitle: new FormGroup({
          basicTitle: new FormControl(null, Validators.required), // string
          advancedTitle: new FormControl(null), // string
          premiumTitle: new FormControl(null), // string
        }),

      packagesDescriptions: new FormGroup({
          basicDescription: new FormControl(null, Validators.required), // string
          advancedDescription: new FormControl(null), // string
          premiumDescription: new FormControl(null), // string
        }),

      packagesDeadlines: new FormGroup({
          basicDeadline: new FormControl(null, Validators.required), // number
          advancedDeadline: new FormControl(null), // number
          premiumDeadline: new FormControl(null), // number
        }),

      packagesChanges: new FormGroup({
          basicChange: new FormControl(null, Validators.required), // number
          advancedChange: new FormControl(null), // number
          premiumChange: new FormControl(null), // number
        }),

      packagesPrices: new FormGroup({
          basicPrice: new FormControl(null, [Validators.required, Validators.minLength(2)]), // number
          advancedPrice: new FormControl(null, Validators.maxLength(7)), // number
          premiumPrice: new FormControl(null, Validators.maxLength(7)), // number
      }),
      // -------------------- Added Options to Main FormBlock --------------------// 
      mainOptions: this.fb.array([
      ]),

      // -------------------- Extra options -------------------- //

      compressedDeadlines: new FormGroup({
        useCompressedDeadlines: new FormControl(false), // boolean
        basicCompressedDays: new FormControl(null, Validators.required), // number
        basicCompressedPrice: new FormControl(null, Validators.required), // number
        advancedCompressedDays: new FormControl(null, Validators.required), // number
        advancedCompressedPrice: new FormControl(null, Validators.required), // number
        premiumCompressedDays: new FormControl(null, Validators.required), // number
        premiumCompressedPrice: new FormControl(null, Validators.required), // number
      }),
      extraOfferChanges: new FormGroup({
        useExtraOfferChanges: new FormControl(false),
        extraChangesDays: new FormControl(null, Validators.required), // number
        extraChangesPrice: new FormControl(null, Validators.required), // number
      }),
      commercialOffer: new FormGroup({
        useCommercialOffer: new FormControl(false), // boolean
        priceForCommercialOffer: new FormControl(null) // number
      }),

      

      basicCompressTime: null,
      basicCompressPrice: null,

      shortDeadlines: new FormGroup(
        {
          shortDeadlinesActivated: new FormControl(false),

        }
      ),

      extraOptionsArray: this.fb.array([
      ])
    });


  }

  changesArrayCounter() {
    const changes = new Array();
    for (let i = 1; i <= 30; i++) {
      changes.push(i);
    }
    return changes;
  }

  // -------------------- Get main  optionsArray --------------------

  get mainOptionsArray() {
    return this.packagesForm.get('mainOptions') as FormArray;
  }

  // ---------- Add option to main packages
  addMainOptin() {
    this.mainOptionsArray.push(this.fb.group(
      {
        title: [null, Validators.required],
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
    if (this.packagesForm.invalid) {
      return;
    }
    console.log(this.packagesForm.value);
    // console.log(this.packagesForm.value.optionsArray = this.mainOptionsArray);
  }

  get useAllPackages() {

    return this.packagesForm.get('allPackages').value;
  }

  openAllPackages() {
    this.packagesForm.controls['allPackages'].setValue(true);
  }

  changePackageAmount(e: boolean) {
    console.log(e)
    this.showPackages = e;
  }



  // *********************** Extra optins functions *******************//

  // -------------------- Get extra optionsArray --------------------

  get extraOptionsArray() {
    return this.packagesForm.get('extraOptionsArray') as FormArray;
  }

  addExtraOptin() {
    this.extraOptionsArray.push(this.fb.group(
      {
        optionTitle: null,
        optionDescription: null,
        optionPrice: null,
        optionPerTime: null
      }
    ));
    console.log(this.extraOptionsArray)
  }

  // -------------------- Show options --------------------

  showOptions() {
    this.optionsVisible = !this.optionsVisible;
  }
}
