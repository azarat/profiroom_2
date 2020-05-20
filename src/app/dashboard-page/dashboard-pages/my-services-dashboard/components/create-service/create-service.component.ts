import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { filter } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserServiceModel } from 'src/app/models/user-services/user-service.model';
import { serviceCreationSteps } from '../../consts/steps.const';
import { UserOffersService } from '../../services/user-offers.service';
import { Title } from '@angular/platform-browser';

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
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private userOffersService: UserOffersService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getUserService();
    // this.currentStep = 1;
    this.titleService.setTitle('Создание услуги');
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
        this.userService = plainToClass(UserServiceModel, response.offer);
      });

  }

  setCurrentStep(step: number) {
    this.currentStep = step;
  }

  public goToStep(stepIndex: number) {
    if (this.userService.step >= stepIndex ) {
      this.userService.step = stepIndex;
    }
  }



}
