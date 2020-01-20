import { Component, OnInit } from '@angular/core';

const n = 5750;

@Component({
  selector: 'app-collocutor-information',
  templateUrl: './collocutor-information.component.html',
  styleUrls: ['./collocutor-information.component.scss']
})
export class CollocutorInformationComponent implements OnInit {

  collocutorRaiting = 4;
  public collocutorAllComments = null;
  public isInformWraped: boolean = false;
  public wrapButtonText: string = 'развернуть';
  constructor() { }

  ngOnInit() {
    this.collocutorAllComments = this.transformCommentsVlalue(n);
  }

  public transformCommentsVlalue(num: number) {
    if (num < 1000) {
      return num;
    } else {
      const exp = Math.floor(Math.log(num) / Math.log(1000));
      const suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];
      return (num / Math.pow(1000, exp)).toFixed(1) + suffixes[exp - 1] + '+';
    }
  }

  public showAllInfo() {
    this.isInformWraped = !this.isInformWraped;
    if(this.isInformWraped) {
      this.wrapButtonText = 'свернуть';
    } else {
      this.wrapButtonText = 'развернуть';
    }
  }
}
