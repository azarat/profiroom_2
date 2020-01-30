import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { UserServiceModel } from 'src/app/models/user-services/user-service.model';
import { NgForm } from '@angular/forms';


import { UserOffersService } from '../../../services/user-offers.service';
import { filter } from 'rxjs/operators';
import { LocalizeRouterService } from 'localize-router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-third-step-creation',
  templateUrl: './third-step-creation.component.html',
  styleUrls: ['./third-step-creation.component.scss'],
})
export class ThirdStepCreationComponent implements OnInit {
translatedPath: any = this.localize.translateRoute('/dashboard/my-services');
  user;
  public submited = false;
  public packagesTypes = ['basic', 'advanced', 'premium'];
  showPackages = false;
  optionsVisible = false;
  constructor(
    private userOffersService: UserOffersService,
    private localize: LocalizeRouterService,
    private router: Router,
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

  // ------------------- Add option to main packages ---------------
  addMainOptin() {

    this.userService.main_options.push(
      {
        title: null,
        basic: false,
        advanced: false,
        premium: false
      });
  }

  deleteMainOption(index) {
    this.userService.removeMainOption(index);
  }

  public nextStep(form: NgForm) {
    this.submited = true;
    if (form.invalid) {
      return;
    }
    this.userOffersService.updateService(this.userService)
      .pipe(filter((res: any) => !!res))
      .subscribe(res => {
        this.userService.step = res.step;
      });
  }

  openAllPackages() {
    this.userService.allPackages = true;
  }

  changePackageAmount(e: boolean) {
    this.showPackages = e;
  }





  // -------------------- Show options --------------------

  showOptions() {
    this.optionsVisible = !this.optionsVisible;
  }

  quite = () => {
    this.router.navigate([this.translatedPath]);
  }

}
