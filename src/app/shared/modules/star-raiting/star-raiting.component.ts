import { Component, OnInit, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-star-raiting',
  templateUrl: './star-raiting.component.html',
  styleUrls: ['./star-raiting.component.scss']
})
export class StarRaitingComponent implements OnInit {
  faStar = faStar;
  farStar = farStar;

  private _maxRaiting = 5;
  public starArray: string[] = [];
  @Input()currentRaiting: number;

  constructor() { }

  public ngOnInit() {
    this.starArray = this._displayRaiting();
  }

  private _displayRaiting() {
    const arr = [];
    for (let i = 1; i <= this._maxRaiting; i++) {
      if (i <= this.currentRaiting) {
        arr.push(faStar);
      } else {
        arr.push(farStar);
      }
    }
    return arr;
  }

}
