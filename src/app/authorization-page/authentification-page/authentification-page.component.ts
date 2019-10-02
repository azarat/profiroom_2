import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentification-page',
  templateUrl: './authentification-page.component.html',
  styleUrls: ['./authentification-page.component.scss']
})
export class AuthentificationPageComponent implements OnInit {

  auth = false;

  constructor() { }
  year = new Date().getFullYear();
  ngOnInit() {
  }
  swipeBtn() {
    this.auth = !this.auth;
  }

}
