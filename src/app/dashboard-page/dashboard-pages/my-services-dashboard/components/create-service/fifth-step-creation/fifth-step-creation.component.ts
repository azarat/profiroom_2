import { Component, OnInit, Input } from '@angular/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { UserOffersService } from '../../../services/user-offers.service';

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
    console.log(this.userService.offerBreef)
    if (this.userService.offerBreef.length === 0) {
      this.addBreefItem()
    }
  }

  addBreefItem() {
    this.userService.offerBreef.push({
      breefTitle: null,
      breefAnswerType: null,
      breefAnwerRequired: null,
      breefAnswerWariants: null,
      breefMultiAnswers: null,
    });
  }

  onSubmit() {

  }
}
