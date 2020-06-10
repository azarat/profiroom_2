import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-how-work',
  templateUrl: './home-page-how-work.component.html',
  styleUrls: ['./home-page-how-work.component.scss']
})
export class HomePageHowWorkComponent implements OnInit {

  public activeTab = 0;
  public currentSlide = 0;

  constructor() { }

  ngOnInit() {
  }
  public selectTab(x) {
    this.activeTab = x;
    this.currentSlide = 0;
  }

  public increaseSlide(){
    this.currentSlide < 3 ? this.currentSlide++ : this.currentSlide;

  }
  public decreaseSlide(){
    this.currentSlide > 0 ? this.currentSlide-- : this.currentSlide; 

  }
  
}
