import { Component, OnInit, Input } from '@angular/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { UserOffersService } from '../../../services/user-offers.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-fifth-step-creation',
  templateUrl: './fifth-step-creation.component.html',
  styleUrls: ['./fifth-step-creation.component.scss']
})
export class FifthStepCreationComponent implements OnInit {

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

  @Input() userService: UserServiceModel;

  constructor(
    private userOffersService: UserOffersService,
  ) { }

  ngOnInit() {
    if (this.userService.offerBreef.length === 0) {
      this.addBreefItem()
    }
  }

  addBreefItem() {
    this.userService.offerBreef.push({
      breefTitle: null,
      breefAnswerType: null,
      breefAnwerRequired: false,
      breefAnswerVariants: [],
      breefMultiAnswers: false,
    },
    {
      breefTitle: null,
      breefAnswerType: null,
      breefAnwerRequired: false,
      breefAnswerVariants: [],
      breefMultiAnswers: false,
    }
    );
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

  onSubmit() {
    this.userOffersService.updateService(this.userService)
    .pipe(filter((res: any) => !! res))
    .subscribe(res => {
      console.log(res)
      this.userService.step = res.step;
    } );
  }
}
