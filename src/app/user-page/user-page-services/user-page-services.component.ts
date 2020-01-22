import { Component, OnInit, Input } from '@angular/core';
import { UserDataInterface } from 'src/app/shared/interfaces/user-data.interface';

@Component({
  selector: 'app-user-page-services',
  templateUrl: './user-page-services.component.html',
  styleUrls: ['./user-page-services.component.scss']
})
export class UserPageServicesComponent implements OnInit {

  @Input() userData: UserDataInterface;

  constructor() { }

  ngOnInit() {
  }

}
