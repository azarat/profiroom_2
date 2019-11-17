import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { filter } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { serviceCreationSteps } from '../../consts/steps.const';
import { UserOffersService } from '../../services/user-offers.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {
  public userService: UserServiceModel;
  public currentStep: number;
  public serviceCreationSteps = serviceCreationSteps;
  constructor(
    private _route: ActivatedRoute,
    private userOffersService: UserOffersService,

  ) { }

  ngOnInit() {
    this.getUserService();
    // this.currentStep = 1;
  }

  //  ** load userServiceData from server
  getUserService() {
    let request: object;
    if (this._route.snapshot.queryParams.offerId) {
      request = this._route.snapshot.queryParams;

    }
    this.userOffersService.getServiceData(request)
      .pipe(
        filter((response: any) => !!response)
      )
      .subscribe(response => {
        console.log(response)
        this.userService = plainToClass(UserServiceModel, response.offer);

      });

  }

  setCurrentStep(step: number){
    console.log(step);
    this.currentStep = step;
  }
  goToStep(stepIndex) {
    if (this.currentStep >= stepIndex ) {
      this.currentStep = stepIndex;
    }
  }

}