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
  } [] = [
    {
      name: 'successDeals'
    },
    {
      name: 'messagesReply'
    },
    {
      name: 'rating'
    },
    {
      name: 'earned'
    },
  ];

  constructor() { }

  ngOnInit() {
  }



}
