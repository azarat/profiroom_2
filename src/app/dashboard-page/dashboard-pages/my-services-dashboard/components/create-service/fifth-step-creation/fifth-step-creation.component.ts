import { Component, OnInit, Input } from '@angular/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { UserOffersService } from '../../../services/user-offers.service';
import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-fifth-step-creation',
  templateUrl: './fifth-step-creation.component.html',
  styleUrls: ['./fifth-step-creation.component.scss']
})
export class FifthStepCreationComponent implements OnInit {
  submited = false;
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
    {
      name: 'Закрепить файл',
      value: 'file'
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
    if (this.userService.offerBreef.length === 0) {
      this.addBreefItem()
    } else {
      this.showedItem = this.userService.offerBreef.length;
    }
  }

  addBreefItem() {
    this.userService.offerBreef.push({
      breefTitle: null,
      breefAnswerType: null,
      breefAnwerRequired: false,
      breefAnswerVariants: [],
      breefMultiAnswers: false,
    }
    );
    this.showedItem = this.userService.offerBreef.length;
  }

  onFiltersChange(e: string, i: number) {
    if (this.userService.offerBreef[i].breefAnswerVariants.length === 0) {
      this.userService.offerBreef[i].breefAnswerVariants.push(
        {
          answerVariant: null
        },
        {
          answerVariant: null
        }
      );
    }
  }

  addBreefAnswers(i: number) {
    if (this.userService.offerBreef[i].breefAnswerType === 'radio') {
      this.userService.offerBreef[i].breefAnswerVariants.push({
        answerVariant: null
      })
    }
  }
  removeAnswer(i: number, j:number) {
    this.userService.offerBreef[i].breefAnswerVariants.splice(j, 1);
  }

  nextStep(form: NgForm) {
    this.submited = true;
    if (!form.valid) {
      return;
    }
    this.userOffersService.updateService(this.userService)
    .pipe(filter((res: any) => !! res))
    .subscribe(res => {
      console.log(res)
      this.userService.step = res.step;
    } );
  }

  changeBreefItem(index: number) {
    this.showedItem = index;
  }

  deleteBreefItem(index: number) {
    this.userService.removeBreefItem(index);
  }

  quite = () => {
    this.router.navigate([this.translatedPath]);
  }
}
