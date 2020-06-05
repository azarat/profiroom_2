import { Component, OnInit, Input } from '@angular/core';

import { UserOffersService } from '../../../services/user-offers.service';
import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { UserServiceModel } from 'src/app/models/user-services/user-service.model';

@Component({
  selector: 'app-fifth-step-creation',
  templateUrl: './fifth-step-creation.component.html',
  styleUrls: ['./fifth-step-creation.component.scss']
})
export class FifthStepCreationComponent implements OnInit {
  submitted = false;
  showedItem: number = null;
  translatedPath: any = this.localize.translateRoute('/dashboard/my-services');
  answerTypes = [
    {
      name: 'Письменный',
      value: 'text'
    },
    {
      name: 'Мультивыбор',
      value: 'radio'
    },
  ];
  characterLength: number = null;

  @Input() userService: UserServiceModel;

  constructor(
    private userOffersService: UserOffersService,
    private router: Router,
    private localize: LocalizeRouterService,
  ) { }

  ngOnInit() {
    console.log(this.userService)
    if (this.userService.offerbrief.length === 0) {
      this.addBriefItem();
    } else {
      this.showedItem = this.userService.offerbrief.length;
    }
  }
//   answer_required: undefined
// answer_type: undefined
// briefAnswerRequired: "0"
// briefAnswerType: "radio"
// briefAnswerVariants: (5) [{…}, {…}, {…}, {…}, {…}]
// briefMultianswers: 0
// briefTitle: "brief PMDSrKvwwL brief))"
// multi_answers: undefined
// title: undefined

  addBriefItem() {
    this.userService.offerbrief.push({
      briefTitle: null,
      briefAnswerType: null,
      briefAnwerRequired: false,
      briefAnswerVariants: [],
      briefMultianswers: false,
      briefMultiAnswers: false,
      briefAnswer: null
    }
    );
    this.showedItem = this.userService.offerbrief.length;
  }

  onFiltersChange(e: string, i: number) {
    if (this.userService.offerbrief[i].briefAnswerType === 'radio' && this.userService.offerbrief[i].briefMultianswers === undefined) {
      this.userService.offerbrief[i].briefAnswerVariants = [
        {
          answerVariant: null
        },
        {
          answerVariant: null
        }];
    } else if (this.userService.offerbrief[i].briefAnswerVariants.length === 0) {
      this.userService.offerbrief[i].briefAnswerVariants.push(
        {
          answerVariant: null
        },
        {
          answerVariant: null
        }
      );
    }
  }

  addBriefAnswers(i: number) {
    if (this.userService.offerbrief[i].briefAnswerType === 'radio') {
      this.userService.offerbrief[i].briefAnswerVariants.push({
        answerVariant: null
      });
    }
  }
  removeAnswer(i: number, j: number) {
    this.userService.offerbrief[i].briefAnswerVariants.splice(j, 1);
  }

  nextStep(form: NgForm) {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    this.userOffersService.updateService(this.userService)
      .pipe(filter((res: any) => !!res))
      .subscribe(res => {
        this.userService.step = res.step;
      });
  }

  changeBriefItem(index: number) {
    this.showedItem = index;
  }

  deleteBriefItem(index: number) {
    this.userService.removeBriefItem(index);
  }

  quite = () => {
    this.router.navigate([this.translatedPath]);
  }
}
