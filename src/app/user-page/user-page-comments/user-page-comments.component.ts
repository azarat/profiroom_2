import { Component, OnInit, Input } from '@angular/core';
import { UserDataInterface } from 'src/app/shared/interfaces/user-data.interface';

@Component({
  selector: 'app-user-page-comments',
  templateUrl: './user-page-comments.component.html',
  styleUrls: ['./user-page-comments.component.scss']
})
export class UserPageCommentsComponent implements OnInit {

  @Input() userData: UserDataInterface;

  constructor() { }

  ngOnInit() {
  }

}
