import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent implements OnInit {

  auth = false;
  constructor() { }

  ngOnInit() {
  }
  swipeBtn() {
    this.auth = !this.auth;
  }

}
