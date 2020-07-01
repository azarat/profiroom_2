import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-questions',
  templateUrl: './home-page-questions.component.html',
  styleUrls: ['./home-page-questions.component.scss']
})
export class HomePageQuestionsComponent implements OnInit {

  private breakPointValue: number;
  public customCollapsedHeight="90px";

  public questions = {
    freelancer: [
      {
        title: "home-page.guestion-itme1-freelancer-title",
        text: "home-page.guestion-itme1-freelancer-text"
      },
      {
        title: "home-page.guestion-itme2-freelancer-title",
        text: "home-page.guestion-itme2-freelancer-text"
      },
      {
        title: "home-page.guestion-itme3-freelancer-title",
        text: "home-page.guestion-itme3-freelancer-text"
      },
      {
        title: "home-page.guestion-itme4-freelancer-title",
        text: "home-page.guestion-itme4-freelancer-text"
      },
      {
        title: "home-page.guestion-itme5-freelancer-title",
        text: "home-page.guestion-itme5-freelancer-text"
      }
    ],
    customer: [
      {
        title: "home-page.guestion-itme1-customer-title",
        text: "home-page.guestion-itme1-customer-text"
      },
      {
        title: "home-page.guestion-itme2-customer-title",
        text: "home-page.guestion-itme2-customer-text"
      },
      {
        title: "home-page.guestion-itme3-customer-title",
        text: "home-page.guestion-itme3-customer-text"
      }
    ]
  };

  public activeTab = "customer";

  constructor() { }

  ngOnInit() {
    this.breakPointValue = window.innerWidth;
    if(this.breakPointValue >= 1200 && this.breakPointValue < 1499) {
      this.customCollapsedHeight = "80px";
    } else if (this.breakPointValue < 1200) {
      this.customCollapsedHeight = "50px";
    }
  }
  public selectTab(x) {
    this.activeTab = x;
  }

}
