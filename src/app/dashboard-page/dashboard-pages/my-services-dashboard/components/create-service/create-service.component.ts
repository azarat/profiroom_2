import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { filter } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserServiceModel } from 'src/app/models/user-services/user-service.model';
import { serviceCreationSteps } from '../../consts/steps.const';
import { UserOffersService } from '../../services/user-offers.service';
import { Title, Meta } from '@angular/platform-browser';

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
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit() {
    this.getUserService();
    // this.currentStep = 1;
    this.titleService.setTitle('Создание услуги');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Биржа удаленных работников для найма фрилансеров быстро, недорого, выполнение работы качественно и в срок. Найдите своего идеального фриансера!' }
    );
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
