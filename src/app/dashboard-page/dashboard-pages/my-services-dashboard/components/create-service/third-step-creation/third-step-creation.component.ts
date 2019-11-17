import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';

import { trigger, state, style, animate, transition, } from '@angular/animations';
import { UserOffersService } from '../../../services/user-offers.service';

@Component({
  selector: 'app-third-step-creation',
  templateUrl: './third-step-creation.component.html',
  styleUrls: ['./third-step-creation.component.scss'],
})
export class ThirdStepCreationComponent implements OnInit {

  user;
  showPackages = false;
  optionsVisible = false;
  constructor(
    private userOffersService: UserOffersService,
  ) { }

  @Input() userService: UserServiceModel;
  @Output() public setCurrentStep = new EventEmitter();

  ngOnInit() { }

  changesArrayCounter() {
    const changes = new Array();
    for (let i = 1; i <= 30; i++) {
      changes.push(i);
    }
    return changes;
  }

  // -------------------- Get main  optionsArray --------------------

  get mainOptionsArray() {
    return this.userService.main_options;
  }

  // ---------- Add option to main packages
  addMainOptin() {
    console.log(this.userService.main_options)
    // if(!this.userService.main_options) {
    //   console.log('test');
    // }
    this.userService.main_options.push(
      {
        title: null,
        basic: false,
        advanced: false,
        premium: false
    });
  }

  deleteMainOption(index) {
    this.userService.removeMainOption(index)
  }

  saveStep() {
    // if (this.ngForm.invalid) {
    //   return;
    // }
    console.log(this.userService);
    this.userOffersService.updateService(this.userService)
    .subscribe(res => {
      console.log(res)
    })
  }

  openAllPackages() {
    this.userService.allPackages = true;
  }

  changePackageAmount(e: boolean) {
    console.log(e);
    this.showPackages = e;
  }





  // -------------------- Show options --------------------

  showOptions() {
    this.optionsVisible = !this.optionsVisible;
  }
}