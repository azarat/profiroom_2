import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  btnNumber = 1;

  constructor() { }

  ngOnInit() {
  }

  showfull(questionNumber) {
    if (questionNumber !== this.btnNumber) {
      this.btnNumber = questionNumber;
    } else {
      this.btnNumber = null;
    }
    console.log(this.btnNumber);
  }

}
