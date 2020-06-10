import { Component, OnInit, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  faStar = faStar;
  farStar = farStar;

  private _maxRating = 5;
  public starArray: string[] = [];
  @Input()currentRating: number;

  constructor() { }

  public ngOnInit() {
    this.starArray = this._displayRating();
  }

  private _displayRating() {
    const arr = [];
    for (let i = 1; i <= this._maxRating; i++) {
      if (i <= this.currentRating) {
        arr.push(faStar);
      } else {
        arr.push(farStar);
      }
    }
    return arr;
  }

}
