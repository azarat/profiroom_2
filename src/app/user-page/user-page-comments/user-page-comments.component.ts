import { Component, OnInit, Input } from '@angular/core';
import { UserDataInterface } from 'src/app/shared/interfaces/user-data.interface';

import {style, state, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-page-comments',
  templateUrl: './user-page-comments.component.html',
  styleUrls: ['./user-page-comments.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        style({opacity: 1}),
        animate(1000, style({opacity: 0}))
      ])
    ])
  ]
})
export class UserPageCommentsComponent implements OnInit {

  @Input() userData: UserDataInterface;
  public currentTab = 0;

  constructor() { }

  ngOnInit() {
  }



}
