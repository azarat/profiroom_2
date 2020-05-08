import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-freelacer-achives',
  templateUrl: './freelacer-achives.component.html',
  styleUrls: ['./freelacer-achives.component.scss']
})
export class FreelacerAchivesComponent implements OnInit {

  @Input() userData: UserModel;
  // achivments
  detailAchives: {
    name: string,
    text: string
  } [] = [
    {
      name: 'successDeals',
      text: 'Количество завершенных заказов'
    },
    {
      name: 'messagesReply',
      text: 'Время ответа'
    },
    {
      name: 'rating',
      text: 'Суммарный рейтинг'
    },
    {
      name: 'earned',
      text: 'Суммарный заработок'
    },
  ];

  constructor() { }

  ngOnInit() {
  }



}
