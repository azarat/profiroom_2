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
    if (this.userService.offerBrief.length === 0) {
      this.addBriefItem();
    } else {
      this.showedItem = this.userService.offerBrief.length;
    }
  }

  addBriefItem() {
    this.userService.offerBrief.push({
      title: null,
      answer_type: null,
      answer_required: false,
      answers: [],
      multi_answers: false,
    }
    );
    this.showedItem = this.userService.offerBrief.length;
  }

  onFiltersChange(e: string, i: number) {
    if (this.userService.offerBrief[i].answer_type === 'radio' && this.userService.offerBrief[i].answers === undefined) {
      this.userService.offerBrief[i].answers = [
        {
          answer: null
        },
        {
          answer: null
        }];
    } else if (this.userService.offerBrief[i].answers.length === 0) {
      this.userService.offerBrief[i].answers.push(
        {
          answer: null
        },
        {
          answer: null
        }
      );
    }
  }

  addBriefAnswers(i: number) {
    if (this.userService.offerBrief[i].answer_type === 'radio') {
      this.userService.offerBrief[i].answers.push({
        answer: null
      });
    }
  }
  removeAnswer(i: number, j: number) {
    this.userService.offerBrief[i].answers.splice(j, 1);
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
