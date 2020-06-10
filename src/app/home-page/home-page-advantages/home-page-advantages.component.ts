import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-advantages',
  templateUrl: './home-page-advantages.component.html',
  styleUrls: ['./home-page-advantages.component.scss']
})
export class HomePageAdvantagesComponent implements OnInit {

  public activeTab = 0;
  constructor() { }

  ngOnInit() {
  }

  toggleTab(x) {
    if(this.activeTab === x) {
      this.activeTab = null;
    } else {
      this.activeTab = x;
    }
  }

}
